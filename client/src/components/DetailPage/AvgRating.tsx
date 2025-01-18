import { AxiosError } from "axios";
import { useReviewsByRestaurantId } from "@/services/tan-stack/review-Tanstack";

interface AvgRatingProps {
  id: string;
}

const AvgRating = ({ id }: AvgRatingProps) => {
  const {
    data: reviews,
    isLoading,
    isError,
    error,
  } = useReviewsByRestaurantId(id);

  const avgRating =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  if (isLoading) {
    return <div>Loading reviews...</div>;
  }

  if (isError) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return <div>0</div>;
    } else {
      return <div>Error loading reviews. Please try again later.</div>;
    }
  }

  return <div>{avgRating === 0 ? 0 : avgRating.toFixed(1)}</div>;
};

export default AvgRating;
