export interface WeeklyHour {
  day: string;
  time_ranges: string;
}

export interface Location {
  type: "Point";
  coordinates: [number, number];
  address?: string;
}

export interface IRestaurant {
  _id: string;
  name: string;
  description?: string;
  cuisine_types: string[];
  image: string;
  background_image: string;
  location?: Location;
  min_order?: string;
  delivery_fee?: string;
  delivery_time?: string;
  phone?: string;
  is_kosher: boolean;
  weekly_hours?: WeeklyHour[];
  avgRating?: number;
  createdAt?: string;
  updatedAt?: string;
  menuItems:IMenuItem[];
}

export interface IMenuItem {
  _id: string;
  name: string;
  available:boolean;
  category:string;
  description?:string;
  image: string;
  price: number;
  restaurant_id: string;
  createdAt?: string;
  updatedAt?: string;
}