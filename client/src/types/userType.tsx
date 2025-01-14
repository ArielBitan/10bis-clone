import { Location } from "./restaurantTypes";

// import { IRestaurantForm } from "./restaurantTypes";

export interface IUser {
  _id?: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password?: string;
  role?: "courier" | "restaurant_owner";
  createdAt?: string;
  full_name: string;
  location: Location;
  updatedAt?: string;
  isDelivering?: boolean;
}

export interface IRestaurantOwnerForm {
  owned_restaurants: (string | undefined)[];
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password?: string;
}

export interface IRestaurantOwner extends IUser {
  owned_restaurants: [string];
  role: "restaurant_owner";
}

export const isRestaurantOwner = (
  user: IUser | IRestaurantOwner
): user is IRestaurantOwner => {
  return (user as IRestaurantOwner).owned_restaurants !== undefined;
};
