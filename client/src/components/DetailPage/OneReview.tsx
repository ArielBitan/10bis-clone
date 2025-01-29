import { IFetchedReview } from "@/types/reviewTypes";
import { Star } from "lucide-react";
import { format } from "date-fns";
import DeleteReview from "./DeleteReview";
import { useUser } from "../context/userContext";

const OneReview = ({ review }: { review: IFetchedReview }) => {
  const { user } = useUser();
  console.log(review);
  // Check if the user is the owner of the review
  const isOwner = user?._id === review?.user_id._id;
  return (
    <div
      dir="rtl"
      className="relative p-4 border border-gray-300 bg-white dark:bg-gray-900 rounded-lg shadow-md"
    >
      {/* Rating + Date */}
      <div className="flex justify-between items-center mb-1">
        {/* Rating stars */}
        <div className="flex flex-row-reverse gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-5 h-5 ${
                index < review.rating ? "text-yellow-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Date & Time */}
        <div className="text-sm text-gray-500 text-left">
          <div>
            {format(new Date(review?.createdAt as Date), "dd MMM yyyy")}
          </div>
          {/* 24-hour format */}
          <div>{format(new Date(review?.createdAt as Date), "HH:mm")}</div>{" "}
        </div>
      </div>

      {/*Review creator name*/}
      <div className="text-gray-900 mb-1 font-semibold">
        {review.user_id.full_name}
      </div>

      {/* Review Text */}
      <div className="text-gray-800 dark:text-white text-right leading-relaxed">
        {review.comment}
      </div>

      {/* Delete Button (if owner) */}
      {isOwner && (
        <div className="absolute bottom-2 left-2">
          <DeleteReview reviewId={review._id as string} />
        </div>
      )}
    </div>
  );
};

export default OneReview;
