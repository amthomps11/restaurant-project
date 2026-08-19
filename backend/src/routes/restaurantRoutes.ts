import type { Request, Response } from 'express';
import { Router } from 'express';

import db from '../database';

import type {
  ApiError,
  MenuItem,
  Restaurant,
  RestaurantParams,
  RestaurantWithMenu
} from '../types';

const router = Router();

const getRestaurant = (
  req: Request<RestaurantParams>,
  res: Response<RestaurantWithMenu | ApiError>
) => {
  const restaurantId = req.params.restaurant_id;

  const restaurant = db
    .prepare(
      `
      SELECT id, name
      FROM restaurants
      WHERE id = ?
      `
    )
    .get(restaurantId) as Restaurant;

  if (!restaurant) {
    return res.status(404).json({
      error: 'Restaurant not found'
    });
  }

  const menu = db
    .prepare(
      `
      SELECT
        id,
        restaurant_id,
        name,
        price,
        description
      FROM menu_items
      WHERE restaurant_id = ?
      ORDER BY id
      `
    )
    .all(restaurantId) as MenuItem[];

  res.json({
    ...restaurant,
    menu
  });
};

router.get('/:restaurant_id', getRestaurant);

export default router;
