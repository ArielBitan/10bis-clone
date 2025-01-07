import { IMenuItem } from "@/types/restaurantTypes";

interface MenuItemCardProps {
  item: IMenuItem;
}
const MenuCard: React.FC<MenuItemCardProps> = ({ item }) => {
  return (
    <div className=" mx-6 my-4 border shadow-lg flex w-auto justify-between hover:shadow-xl hover:border-gray-300 transition duration-300">
      <div className="px-4 pt-4 flex flex-col justify-between">
        <div className="mb-2">
          <h3 className="font-bold text-lg">{item.name}</h3>
          {item.description && (
            <p className="text-sm truncate w-64  md:w-3/4 ">
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

export default MenuCard;
