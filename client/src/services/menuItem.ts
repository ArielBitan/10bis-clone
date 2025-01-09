import api from "@/lib/api";
import { IMenuItem } from "@/types/restaurantTypes";

// Function to create a new menu item
export const createMenuItem = async (
  menuItem: IMenuItem
): Promise<IMenuItem> => {
  try {
    const { data } = await api.post<IMenuItem>("/items/", menuItem);
    return data;
  } catch (error) {
    console.error("Error creating menu item:", error);
    throw error;
  }
};

// Function to update an existing menu item
export const updateMenuItem = async (
  id: string,
  menuItem: Partial<IMenuItem>
): Promise<IMenuItem> => {
  try {
    const { data } = await api.put<IMenuItem>(`/items/${id}`, menuItem);
    return data;
  } catch (error) {
    console.error(`Error updating menu item with ID ${id}:`, error);
    throw error;
  }
};

// Function to delete a menu item
export const deleteMenuItem = async (id: string): Promise<void> => {
  try {
    await api.delete(`/items/${id}`);
  } catch (error) {
    console.error(`Error deleting menu item with ID ${id}:`, error);
    throw error;
  }
};
