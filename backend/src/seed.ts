import bcrypt from 'bcrypt';
import db from './database.ts';

db.exec(`
  DELETE FROM menu_items;
  DELETE FROM restaurants;

  DELETE FROM sqlite_sequence WHERE name = 'menu_items';
  DELETE FROM sqlite_sequence WHERE name = 'restaurants';
`);

const insertRestaurant = db.prepare(`
  INSERT INTO restaurants (name, password_hash)
  VALUES (?, ?)
`);

const insertMenuItem = db.prepare(`
  INSERT INTO menu_items (
    restaurant_id,
    name,
    price,
    description
  )
  VALUES (?, ?, ?, ?)
`);

const firstRestaurantPassword = 'pizza123';
const firstRestaurantPasswordHash = bcrypt.hashSync(
  firstRestaurantPassword,
  10
);

const firstRestaurantResult = insertRestaurant.run(
  'Burger House',
  firstRestaurantPasswordHash
);

const firstRestaurantId = firstRestaurantResult.lastInsertRowid;

const firstRestaurantMenuItems = [
  ['Cheeseburger', 12.99, 'Fresh beef, cheddar, lettuce, and tomato'],
  ['Chicken Sandwich', 11.49, 'Grilled chicken with garlic aioli'],
  ['French Fries', 4.99, 'Crispy seasoned fries'],
  ['Caesar Salad', 9.99, 'Romaine, parmesan, and croutons']
];

for (const item of firstRestaurantMenuItems) {
  insertMenuItem.run(firstRestaurantId, ...item);
}

const secondRestaurantPassword = 'taco123';
const secondRestaurantPasswordHash = bcrypt.hashSync(
  secondRestaurantPassword,
  10
);

const secondRestaurantResult = insertRestaurant.run(
  'Taco Garden',
  secondRestaurantPasswordHash
);

const secondRestaurantId = secondRestaurantResult.lastInsertRowid;

const secondRestaurantMenuItems = [
  ['Chicken Tacos', 10.99, 'Three tacos with chicken, salsa, and cilantro'],
  ['Steak Burrito', 13.49, 'Steak, rice, beans, cheese, and salsa'],
  ['Chips and Guacamole', 6.99, 'Fresh guacamole with tortilla chips'],
  ['Horchata', 3.99, 'Sweet cinnamon rice drink']
];

for (const item of secondRestaurantMenuItems) {
  insertMenuItem.run(secondRestaurantId, ...item);
}

console.log('Database seeded successfully!');

console.log('\nBurger House');
console.log('Restaurant ID:', firstRestaurantId);
console.log('Password:', firstRestaurantPassword);

console.log('\nTaco Garden');
console.log('Restaurant ID:', secondRestaurantId);
console.log('Password:', secondRestaurantPassword);
