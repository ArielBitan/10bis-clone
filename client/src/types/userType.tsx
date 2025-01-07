import { Location } from "./restaurantTypes";

export interface IUser {
  _id?: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  role?: "courier" | "restaurant_owner";
  createdAt?: string;
  location: Location;
  updatedAt?: string;
  isDelivering?: boolean;
}

export interface IRestaurantOwnerForm extends IUser {
  restaurantId: string;
  role: "restaurant_owner";
}
