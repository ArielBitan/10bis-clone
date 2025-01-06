export interface IUser {
  _id?: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  role?: "courier" | "restaurant_owner";
  createdAt?: string;
  updatedAt?: string;
}

export interface IRestaurantOwnerForm extends IUser {
  restaurantId: string;
  role: "restaurant_owner";
}
