import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchRestaurantReviews,
  createReview,
  deleteReview,
} from "@/services/reviewService";
import { IReview } from "@/types/reviewTypes";
import { useState } from "react";

// Fetch reviews by restaurant ID
export const useReviewsByRestaurantId = (restaurantId: string) => {
  return useQuery<IReview[], Error>({
    queryKey: ["reviews", restaurantId],
    queryFn: () => fetchRestaurantReviews(restaurantId),
    enabled: !!restaurantId,
  });
};

// Create a review
export const useCreateReview = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (newReview: {
      restaurantId: string;
      userId: string;
      comment: string;
      rating: number;
    }) => {
      setIsLoading(true);
      await createReview({
        user_id: newReview.userId,
        restaurant_id: newReview.restaurantId,
        rating: newReview.rating,
        comment: newReview.comment,
      });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", variables.restaurantId],
      });
      setIsLoading(false);
    },
    onError: (error: Error) => {
      console.error("Error creating review:", error);
      setIsLoading(false);
    },
  });

  return { ...mutation, isLoading };
};

// Delete a review
export const useDeleteReview = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: async (reviewId: string) => {
      setIsLoading(true);
      await deleteReview(reviewId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      setIsLoading(false);
    },
    onError: (error: Error) => {
      console.error("Error deleting review:", error);
      setIsLoading(false);
    },
  });

  return { ...mutation, isLoading };
};
