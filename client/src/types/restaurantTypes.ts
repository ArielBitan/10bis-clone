export interface WeeklyHour {
  day: string;
  time_ranges: string;
}

export interface Location {
  type?: "Point";
  coordinates: number[];
  address?: string;
}

export interface IRestaurant {
  _id?: string;
  name: string;
  description?: string;
  cuisine_types: string[];
  image: File | string;
  background_image: File | string;
  location: Location;
  min_order?: string;
  delivery_fee?: string;
  delivery_time?: string;
  phone?: string;
  is_kosher: boolean;
  weekly_hours?: WeeklyHour[];
  avgRatings?: number;
  createdAt?: string;
  updatedAt?: string;
  menuItems?: IMenuItem[];
}

export interface IMenuItem {
  _id?: string;
  name: string;
  available: boolean;
  category: string;
  description?: string;
  image: string;
  price: number;
  restaurant_id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IRestaurantForm {
  name: string;
  phone: string;
}
