import { Location } from "./restaurantTypes";

import { IRestaurantForm } from "./restaurantTypes";

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
}

export interface IRestaurantOwnerForm extends IUser {
  owned_restaurants: string|IRestaurantForm;
  role: "restaurant_owner";
}

export const isRestaurantOwner = (
  user: IUser | IRestaurantOwnerForm
): user is IRestaurantOwnerForm => {
  return (user as IRestaurantOwnerForm).owned_restaurants !== undefined;
};
