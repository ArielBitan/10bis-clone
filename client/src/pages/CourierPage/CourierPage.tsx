import UserMenu from "@/components/layout/UserMenu";
import ActiveOrder from "@/components/CourierPage/ActiveOrder";
import AvailableOrders from "@/components/CourierPage/AvailableOrders";
import { useEffect, useState } from "react";
import { useUser } from "@/components/context/userContext";
import { fetchUserProfile } from "@/services/userService";

const CourierPage = () => {
  const { user, setUser } = useUser();
  const [isDelivering, setIsDelivering] = useState<Boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const updatedUser = await fetchUserProfile();
      setUser(updatedUser);
      setIsDelivering(user?.isDelivering || false);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto h-screen bg-gray-50">
      <div className="bg-orangePrimary p-4 shadow-sm sticky top-0 z-10">
        <div className="flex justify-between items-center">
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
