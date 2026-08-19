import { Request, Response, Router } from 'express';
import db from '../database';
import { requireAuth } from '../middleware/auth';
import {
  ApiError,
  CreateMenuItemBody,
  MenuItem,
  UpdateMenuItemBody,
  MenuItemParams
} from '../types';

const router = Router();

const createMenuItem = (
  req: Request<{}, {}, CreateMenuItemBody>,
  res: Response<MenuItem | ApiError>
): void => {
  const { name, price, description } = req.body;
  const restaurantId = req.session.restaurantId;

  const result = db
    .prepare(
      `
      INSERT INTO menu_items (
        restaurant_id,
        name,
        price,
        description
      )
      VALUES (?, ?, ?, ?)
      `
    )
    .run(restaurantId, name, price, description);

  if (result.changes === 0) {
    res.status(404).json({
      error: 'Error creating menu item'
    });
    return;
  }

  const menuItem = db
    .prepare(
      `
      SELECT
        id,
        restaurant_id,
        name,
        price,
        description
      FROM menu_items
      WHERE id = ?
      `
    )
    .get(result.lastInsertRowid) as MenuItem;

  res.status(201).json(menuItem);
};

const updateMenuItem = (
  req: Request<MenuItemParams, {}, UpdateMenuItemBody>,
  res: Response<MenuItem | ApiError>
): void => {
  const { name, price, description } = req.body;
  const restaurantId = req.session.restaurantId;

  const result = db
    .prepare(
      `
      UPDATE menu_items
      SET
        name = ?,
        price = ?,
        description = ?
      WHERE id = ?
        AND restaurant_id = ?
      `
    )
    .run(name, price, description, req.params.menu_item_id, restaurantId);

  if (result.changes === 0) {
    res.status(404).json({
      error: 'Menu item not found'
    });
    return;
  }

  const menuItem = db
    .prepare(
      `
      SELECT
        id,
        restaurant_id AS restaurantId,
        name,
        price,
        description
      FROM menu_items
      WHERE id = ?
        AND restaurant_id = ?
      `
    )
    .get(req.params.menu_item_id, restaurantId) as MenuItem;

  res.json(menuItem);
};

const deleteMenuItem = (
  req: Request<MenuItemParams>,
  res: Response<ApiError>
): void => {
  const restaurantId = req.session.restaurantId;

  const result = db
    .prepare(
      `
      DELETE FROM menu_items
      WHERE id = ?
        AND restaurant_id = ?
      `
    )
    .run(req.params.menu_item_id, restaurantId);

  if (result.changes === 0) {
    res.status(404).json({
      error: 'Menu item not found'
    });
    return;
  }

  res.sendStatus(204);
};

router.post('/', requireAuth, createMenuItem);
router.put('/:menu_item_id', requireAuth, updateMenuItem);
router.delete('/:menu_item_id', requireAuth, deleteMenuItem);

export default router;
