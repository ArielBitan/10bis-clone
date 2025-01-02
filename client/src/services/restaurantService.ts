import api from "@/lib/api";
import { IRestaurant } from "@/types/restaurantTypes";

// Function to fetch all restaurants
export const fetchAllRestaurants = async (): Promise<IRestaurant[]> => {
  try {
    const { data } = await api.get<IRestaurant[]>(`/restaurants`);
    return data;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};

// Function to fetch a single restaurant by ID
export const fetchRestaurantById = async (
  restaurantId: string
): Promise<IRestaurant> => {
  try {
    const { data } = await api.get<IRestaurant>(`/restaurants/${restaurantId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching restaurant with ID ${restaurantId}:`, error);
    throw error;
  }
};

// Function to create a new restaurant
export const createRestaurant = async (
  restaurantData: Omit<IRestaurant, "_id" | "createdAt" | "updatedAt">
): Promise<IRestaurant> => {
  try {
    const { data } = await api.post<IRestaurant>(
      "/restaurants",
      restaurantData
    );
    return data;
  } catch (error) {
    console.error("Error creating restaurant:", error);
    throw error;
  }
};

// Function to check if the current user owns the restaurant
export const checkRestaurantOwnership = async (
  restaurantId: string
): Promise<boolean> => {
  const { data } = await api.get(`/restaurants/${restaurantId}/is-owner`);
  return data;
};

// Function to update an existing restaurant
export const updateRestaurant = async (
  restaurantId: string,
  updatedData: Partial<IRestaurant>
): Promise<IRestaurant> => {
  try {
    const { data } = await api.put<IRestaurant>(
      `/restaurants/${restaurantId}`,
      updatedData
    );
    return data;
  } catch (error) {
    console.error(`Error updating restaurant with ID ${restaurantId}:`, error);
    throw error;
  }
};

// Function to delete a restaurant
export const deleteRestaurant = async (restaurantId: string): Promise<void> => {
  try {
    await api.delete(`/restaurants/${restaurantId}`);
  } catch (error) {
    console.error(`Error deleting restaurant with ID ${restaurantId}:`, error);
    throw error;
  }
};