export interface IUser {
  _id?: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
  role?: "courier" | "restaurant_owner" | "business_owner";
  createdAt?: string;
  updatedAt?: string;
}
