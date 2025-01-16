import { IReview } from "@/types/reviewTypes";
import { Star } from "lucide-react";
import { format } from "date-fns";
import DeleteReview from "./DeleteReview";
import { useUser } from "../context/userContext";

const OneReview = ({ review }: { review: IReview }) => {
  const { user } = useUser();

  // owner?
  const isOwner = user?._id === review?.user_id;

  return (
    <div className="relative p-4 border border-gray-300 rtl">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-500">
            <div>
              {format(new Date(review?.createdAt as Date), "dd MMM yyyy")}
            </div>
            <div>{format(new Date(review?.createdAt as Date), "hh:mm")}</div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {isOwner && (
            <div className="absolute bottom-2 right-2">
              <DeleteReview reviewId={review._id as string} />
            </div>
          )}

          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${
                  index < review.rating ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-2 text-gray-700 dark:text-white">{review.comment}</div>
    </div>
  );
};

export default OneReview;
