import UserMenu from "@/components/layout/UserMenu";
import ActiveOrder from "@/components/CourierPage/ActiveOrder";
import AvailableOrders from "@/components/CourierPage/AvailableOrders";
import { useEffect, useState } from "react";
import { useUser } from "@/components/context/userContext";
import { fetchUserProfile } from "@/services/userService";
import Loading from "@/components/Loading";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CourierPage = () => {
  const { toast } = useToast();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [isDelivering, setIsDelivering] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const updatedUser = await fetchUserProfile();
        setUser(updatedUser);
        setIsDelivering(updatedUser?.isDelivering || false);
      } catch (error) {
        toast({
          title: "שגיאה",
          description: "אנא התחבר כשליח כדי לבצע משלוחים",
          variant: "destructive",
        });
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-screen max-w-md mx-auto bg-gray-50">
      <div className="sticky top-0 z-10 p-4 shadow-sm bg-orangePrimary">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserMenu />
          </div>
        </div>
      </div>
      {isDelivering ? (
        <ActiveOrder setIsDelivering={setIsDelivering} />
      ) : (
        <AvailableOrders setIsDelivering={setIsDelivering} />
      )}
    </div>
  );
};

export default CourierPage;
