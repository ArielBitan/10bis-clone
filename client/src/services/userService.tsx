import api from "@/lib/api";
import {
  IUser,
  //   ICourier,
  //   IRestaurantOwner,
  //   IBusinessOwner,
} from "@/types/userType";

// Function to fetch all users
export const fetchAllUsers = async (): Promise<IUser[]> => {
  try {
    const { data } = await api.get<IUser[]>("/users");
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Function to fetch user profile (authenticated)
export const fetchUserProfile = async (): Promise<IUser> => {
  try {
    const { data } = await api.get<IUser>("/users/profile");
    return data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

// Function to update user profile (authenticated)
export const updateUserProfile = async (
  updatedData: Partial<IUser>
): Promise<IUser> => {
  try {
    const { data } = await api.put<IUser>("/users/profile", updatedData);
    return data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Function to create a new courier user
export const createCourier = async (
  courierData: Omit<ICourier, "_id" | "createdAt" | "updatedAt">
): Promise<ICourier> => {
  try {
    const { data } = await api.post<ICourier>(
      "/users/register/courier",
      courierData
    );
    return data;
  } catch (error) {
    console.error("Error creating courier:", error);
    throw error;
  }
};

// Function to create a new restaurant owner user
export const createRestaurantOwner = async (
  restaurantOwnerData: Omit<IRestaurantOwner, "_id" | "createdAt" | "updatedAt">
): Promise<IRestaurantOwner> => {
  try {
    const { data } = await api.post<IRestaurantOwner>(
      "/users/register/restaurant-owner",
      restaurantOwnerData
    );
    return data;
  } catch (error) {
    console.error("Error creating restaurant owner:", error);
    throw error;
  }
};

// Function to create a new business owner user
export const createBusinessOwner = async (
  businessOwnerData: Omit<IBusinessOwner, "_id" | "createdAt" | "updatedAt">
): Promise<IBusinessOwner> => {
  try {
    const { data } = await api.post<IBusinessOwner>(
      "/users/register/business-owner",
      businessOwnerData
    );
    return data;
  } catch (error) {
    console.error("Error creating business owner:", error);
    throw error;
  }
};

// Function for user login
export const loginUser = async (
  email: string,
  password: string
): Promise<{ user: IUser; token: string }> => {
  try {
    const { data } = await api.post<{ user: IUser; token: string }>(
      "/users/login",
      {
        email,
        password,
      }
    );
    return data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// Function for user registration
export const registerUser = async (
  userData: Omit<IUser, "_id" | "createdAt" | "updatedAt" | "role">
): Promise<IUser> => {
  try {
    const { data } = await api.post<IUser>("/users/register", userData);
    return data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};
