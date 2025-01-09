import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMenuItem, deleteMenuItem, updateMenuItem } from '../menuItem';
import { IMenuItem } from '@/types/restaurantTypes';

export const useCreateMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (menuItem: IMenuItem) => createMenuItem(menuItem),
    onError: (error) => {
      console.error("Error creating menu item:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    },
  });
};

export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, menuItem }: { id: string; menuItem: Partial<IMenuItem> }) => updateMenuItem(id, menuItem),
    onError: (error) => {
      console.error("Error updating menu item:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    },
  });
};

export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMenuItem(id),
    onError: (error) => {
      console.error("Error deleting menu item:", error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    },
  });
};
