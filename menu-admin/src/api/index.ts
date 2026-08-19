const API_URL = import.meta.env.VITE_API_URL;

import type {
  LoginResponse,
  LogoutResponse,
  MenuItem,
  MenuItemInput,
  Restaurant,
  SessionResponse,
} from "@/types";

interface ApiErrorResponse {
  error?: string;
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const errorData = data as ApiErrorResponse | null;

    throw new Error(
      errorData?.error ?? `Request failed with status ${response.status}`,
    );
  }

  return data as T;
}

export const login = (
  restaurantId: number,
  password: string,
): Promise<LoginResponse> => {
  return apiFetch<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      restaurantId,
      password,
    }),
  });
};

export const logout = (): Promise<LogoutResponse> => {
  return apiFetch<LogoutResponse>("/auth/logout", {
    method: "POST",
  });
};

export const checkSession = (): Promise<SessionResponse> => {
  return apiFetch<SessionResponse>("/auth/session");
};

export const getRestaurant = (restaurantId: number): Promise<Restaurant> => {
  return apiFetch<Restaurant>(`/restaurants/${restaurantId}`);
};

export const getMenuItem = (id: number): Promise<MenuItem> => {
  return apiFetch<MenuItem>(`/menu-items/${id}`);
};

export const createMenuItem = (menuItem: MenuItemInput): Promise<MenuItem> => {
  return apiFetch<MenuItem>("/menu-items", {
    method: "POST",
    body: JSON.stringify({
      ...menuItem,
    }),
  });
};

export const updateMenuItem = (
  id: number,
  menuItem: MenuItemInput,
): Promise<MenuItem> => {
  return apiFetch<MenuItem>(`/menu-items/${id}`, {
    method: "PUT",
    body: JSON.stringify(menuItem),
  });
};

export const deleteMenuItem = (id: number): Promise<void> => {
  return apiFetch<void>(`/menu-items/${id}`, {
    method: "DELETE",
  });
};
