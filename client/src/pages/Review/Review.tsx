import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";
import { createReview } from "@/services/reviewService";
import { useUser } from "@/components/context/userContext";
import { useToast } from "@/hooks/use-toast";

const Review = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { user } = useUser();
  const userId = user?._id;
  const navigate = useNavigate();
  const [rating, setRating] = useState<number>(0);
  const [formData, setFormData] = useState({
    description: "",
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      const form = {
        user_id: userId ?? "",
        restaurant_id: id,
        rating: rating || 1,
        comment: formData.description,
      };

      try {
        await createReview(form);
        window.location.reload();
        navigate(-1);
        toast({
          title: "תגובה נוספה",
          description: "תגובה נוספה בהצלחה, תודה !",
        });
      } catch (error) {
        console.error("Error creating review:", error);
        setErrorMessage("שגיאה בשליחת הביקורת. אנא נסה שנית.");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        className="w-[70%] h-[50%] sm:max-w-[700px] overflow-auto p-10 text-3xl bg-orangePrimary relative rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 opacity-70 hover:opacity-100 focus:outline-none"
          aria-label="Close"
        >
          ✖
        </button>

        <h1 className="w-full p-2 text-3xl text-center text-white">
          הוסף ביקורת
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 text-black"
          dir="rtl"
        >
          {errorMessage && (
            <div className="mb-4 text-center text-red-500">{errorMessage}</div>
          )}

          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((rate) => (
              <span
                key={rate}
                className={`cursor-pointer text-2xl ${
                  rating >= rate ? "text-yellow-500" : "text-gray-400"
                }`}
                onClick={() => handleRating(rate)}
              >
                ★
              </span>
            ))}
          </div>

          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="תיאור הביקורת"
            required
            rows={5}
          />

          <Button className="justify-center w-full">שלח ביקורת</Button>
        </form>
      </div>
    </div>
  );
};

export default Review;
