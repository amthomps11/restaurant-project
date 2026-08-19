export interface Restaurant {
  id: number;
  name: string;
}

export interface MenuItem {
  id: number;
  restaurant_id: number;
  name: string;
  price: number;
  description: string;
}

export interface RestaurantWithMenu extends Restaurant {
  menu: MenuItem[];
}

export interface ApiError {
  error: string;
}

export interface LoginBody {
  restaurantId: number;
  password: string;
}

export interface CreateMenuItemBody {
  name: string;
  price: number;
  description: string;
}

export interface UpdateMenuItemBody {
  name: string;
  price: number;
  description: string;
}

export type RestaurantParams = {
  restaurant_id: string;
};

export type MenuItemParams = {
  menu_item_id: string;
};
