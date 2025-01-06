import { IRestaurant } from "./restaurantTypes";
import { IUser } from "./userType";

interface IMenuItem {
  _id: string;
  restaurant_id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  available: boolean;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface IPaymentDetails {
  method: string;
  amount: number;
}

export interface IOrder {
  _id: string;
  user_id: IUser;
  restaurant_id: IRestaurant;
  courier_id: string;
  order_items: IMenuItem[];
  status: string;
  special_instructions: string[];
  payment_details: IPaymentDetails;
  total_amount: number;
  createdAt: string;
}
