import 'express-session';

declare module 'express-session' {
  interface SessionData {
    restaurantId?: number;
    isLoggedIn?: boolean;
  }
}