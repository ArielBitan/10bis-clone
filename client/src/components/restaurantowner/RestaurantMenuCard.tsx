import { IMenuItem } from "@/types/restaurantTypes";
import { useUser } from "../context/userContext";
import { Button } from "../ui/button";
import { useDeleteMenuItem } from "@/services/tan-stack/menuItem-TenStack";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import EditItem from "./EditItem";

interface MenuItemCardProps {
  item: IMenuItem;
  renderFunc: () => void;
}

const RestaurantMenuCard: React.FC<MenuItemCardProps> = ({
  item,
  renderFunc,
}) => {
  const { user } = useUser();
  let isRestOwner = false;
  if (user) {
    if ("owned_restaurants" in user) {
      isRestOwner = user.owned_restaurants.some(
        (res) => res === item.restaurant_id
      );
    }
  }

  const { mutate: deleteMenuItemMutation } = useDeleteMenuItem();

  const handleDelete = async () => {
    if (!item?._id) return;
    try {
      deleteMenuItemMutation(item._id);
      renderFunc();
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  if (!isRestOwner) {
    return (
      <div className="flex justify-between w-auto mx-6 my-4 transition duration-300 border shadow-lg hover:shadow-xl hover:border-gray-300">
        <div className="flex flex-col justify-between px-4 pt-4">
          <div className="mb-2">
            <h3 className="text-lg font-bold">{item.name}</h3>
            {item.description && (
              <p className="w-64 text-sm truncate md:w-3/4 ">
                {item.description.split(".")[0]}
              </p>
            )}
          </div>
          <div className="mb-2 text-base">
            <span>{` ₪${item.price || 0}`}</span>
          </div>
        </div>
        <div>
          <img
            src={item.image}
            alt="background_image"
            className="w-[131px] h-[134px] object-cover "
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between w-auto mx-6 my-4 transition duration-300 border shadow-lg hover:shadow-xl hover:border-gray-300">
      <div className="flex flex-col justify-between px-4 pt-4">
        <div className="mb-2">
          <div className="flex items-center gap-2 mb-2">
            <Button variant={"delete"} onClick={handleDelete}>
              מחק פריט
            </Button>

            <Dialog>
              <DialogTrigger asChild>
                <Button>ערוך פריט</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-orangePrimary">
                <EditItem item={item} renderFunc={renderFunc} />
              </DialogContent>
            </Dialog>
          </div>
          <h3 className="text-lg font-bold">{item.name}</h3>
          {item.description && (
            <p className="w-64 text-sm truncate md:w-3/4 ">
              {item.description.split(".")[0]}
            </p>
          )}
        </div>
        <div className="mb-2 text-base">
          <span>{` ₪${item.price || 0}`}</span>
        </div>
      </div>
      <div>
        <img
          src={item.image}
          alt="background_image"
          className="w-[131px] h-[134px] object-cover "
        />
      </div>
    </div>
  );
};

export default RestaurantMenuCard;
