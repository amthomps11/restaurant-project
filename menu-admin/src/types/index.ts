export interface MenuItem {
  id: number;
  restaurant_id: number;
  name: string;
  price: number;
  description: string;
}

export interface Restaurant {
  id: number;
  name: string;
  menu: MenuItem[];
}

export interface MenuItemInput {
  name: string;
  price: number;
  description: string;
}

export interface LoginResponse {
  success: boolean;
  restaurant: {
    id: number;
    name: string;
  };
}

export interface LogoutResponse {
  success: boolean;
}

export interface SessionResponse {
  isLoggedIn: boolean;
  restaurantId: number;
}
