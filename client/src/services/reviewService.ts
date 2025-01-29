import api from "@/lib/api";
import { IFetchedReview, IReview } from "@/types/reviewTypes";

// Function to create a review
export const createReview = async (reviewData: IReview): Promise<IReview> => {
  try {
    const { data } = await api.post<IReview>("/reviews", reviewData);
    return data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};

// Function to fetch reviews for a restaurant
export const fetchRestaurantReviews = async (
  restaurantId: string
): Promise<IFetchedReview[]> => {
  try {
    const { data } = await api.get<IFetchedReview[]>(
      `/reviews/restaurant/${restaurantId}`
    );
    return data;
  } catch (error) {
    console.error("Error fetching restaurant reviews:", error);
    throw error;
  }
};

// Function to fetch reviews by user
export const fetchReviewsByUser = async (
  userId: string
): Promise<IReview[]> => {
  try {
    const { data } = await api.get<IReview[]>(`/reviews/user/${userId}`);
    return data;
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    throw error;
  }
};

// Function to update a review
export const updateReview = async (
  reviewId: string,
  reviewData: IReview
): Promise<IReview> => {
  try {
    const { data } = await api.put<IReview>(`/reviews/${reviewId}`, reviewData);
    return data;
  } catch (error) {
    console.error("Error updating review:", error);
    throw error;
  }
};

// Function to delete a review
export const deleteReview = async (reviewId: string): Promise<void> => {
  try {
    await api.delete(`/reviews/${reviewId}`);
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
};
