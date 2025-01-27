import { IUser } from "./userType";
import { Location } from "./restaurantTypes";

export interface ICompany {
  _id: string; // Mongoose _id field, which is a string by default
  name: string;
  website?: string;
  email: string;

  // Management
  owner: IUser; // Referencing IUser type for the owner
  employees: IUser[]; // Array of IUser for employees

  // Billing
  recharge_rate: "weekly" | "monthly" | "quarterly" | "annually";
  charge_amount: number;

  // Contact & Location
  location: Location; // Assuming location is an embedded document with an ILocation interface
  phone: string;

  status: "active" | "inactive" | "suspended";

  createdAt: string; // The timestamp fields (createdAt, updatedAt) are automatically managed by Mongoose
  updatedAt: string;
}
