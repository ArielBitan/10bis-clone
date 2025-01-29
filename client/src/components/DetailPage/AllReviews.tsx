import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import OneReview from "./OneReview";
import { AxiosError } from "axios";
import { useReviewsByRestaurantId } from "@/services/tan-stack/review-Tanstack";
import { IFetchedReview } from "@/types/reviewTypes";

interface AllReviewsProps {
  id: string;
}

const AllReviews = ({ id }: AllReviewsProps) => {
  const {
    data: reviews,
    isLoading,
    isError,
    error,
    refetch,
  } = useReviewsByRestaurantId(id);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    if (isDrawerOpen) {
      refetch();
    }
  }, [isDrawerOpen, refetch]);

  if (isLoading) {
    return <div>טוען ביקורות...</div>;
  }

  if (isError) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return (
        <div className="p-4">
          <Drawer>
            <DrawerTrigger asChild>
              <span
                className="text-blue-700 cursor-pointer"
                onClick={() => setIsDrawerOpen(true)}
              >
                | כל הביקורות
              </span>
            </DrawerTrigger>
            <DrawerContent>
              <div className="w-full max-w-sm mx-auto ">
                <DrawerHeader className="flex items-center justify-center text-center">
                  <DrawerTitle className="text-center">כל הביקורות</DrawerTitle>
                  <DrawerDescription className="text-center">
                    אין ביקורות לעסק זה
                  </DrawerDescription>
                </DrawerHeader>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      );
    } else {
      return <div>שגיאה בטעינת ביקורות, אנא נסה שנית מאוחר יותר</div>;
    }
  }

  return (
    <div className="p-4">
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <span
            className="text-blue-700 cursor-pointer"
            onClick={() => setIsDrawerOpen(true)}
          >
            | כל הביקורות
          </span>
        </DrawerTrigger>
        <DrawerContent>
          <div className="w-full max-w-sm mx-auto">
            <DrawerHeader className="flex flex-col items-center justify-center text-center">
              <DrawerTitle>כל הביקורות</DrawerTitle>
              <DrawerDescription>
                {reviews !== undefined && reviews?.length > 0
                  ? `ביקורות : ${reviews?.length}`
                  : "אין ביקורות לעסק"}{" "}
              </DrawerDescription>
            </DrawerHeader>
          </div>
          <div className="p-4 pb-0">
            <DrawerFooter>
              <div className="p-4 max-h-[53vh] overflow-y-auto">
                {reviews && reviews.length > 0 ? (
                  reviews.map((review: IFetchedReview) => (
                    <OneReview review={review} key={review._id} />
                  ))
                ) : (
                  <div>אין ביקורות למסעדה</div>
                )}
              </div>

              <DrawerClose asChild>
                <Button>סגור</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AllReviews;
