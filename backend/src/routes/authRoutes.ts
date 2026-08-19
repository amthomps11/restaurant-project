import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import db from '../database';
import type { Restaurant } from '../types';

const authRouter = Router();

const getSession = (req: Request, res: Response) => {
  return res.json({
    restaurantId: req.session.restaurantId,
    isLoggedIn: Boolean(req.session.isLoggedIn)
  });
};

const login = async (req: Request, res: Response) => {
  const restaurantId = Number(req.body.restaurantId);
  const password = req.body.password;

  if (!Number.isInteger(restaurantId) || typeof password !== 'string') {
    return res.status(400).json({
      error: 'restaurantId and password are required'
    });
  }

  const restaurant = db
    .prepare(
      `
      SELECT id, name, password_hash
      FROM restaurants
      WHERE id = ?
      `
    )
    .get(restaurantId) as (Restaurant & { password_hash: string }) | undefined;

  if (!restaurant) {
    return res.status(401).json({
      error: 'Invalid restaurant or password'
    });
  }

  const passwordMatches = await bcrypt.compare(
    password,
    restaurant.password_hash
  );

  if (!passwordMatches) {
    return res.status(401).json({
      error: 'Invalid restaurant or password'
    });
  }

  req.session.restaurantId = restaurant.id;
  req.session.isLoggedIn = true;

  return res.json({
    success: true,
    restaurant: {
      id: restaurant.id,
      name: restaurant.name
    }
  });
};

const logout = (req: Request, res: Response) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        error: 'Could not log out'
      });
    }

    res.clearCookie('connect.sid');

    return res.json({
      success: true
    });
  });
};

authRouter.get('/session', getSession);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

export default authRouter;
