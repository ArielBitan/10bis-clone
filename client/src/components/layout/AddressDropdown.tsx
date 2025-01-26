import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MdPlace } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { Button } from "../ui/button";
import PlacesAutocomplete from "../LandingPage/PlacesAutocomplete";
import { useRestaurantContext } from "../context/restaurantContext";

export default function AddressDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("delivery");
  const [isEditingAddress, setIsEditingAddress] = useState(false); // Track if editing a new address
  const userAddress = localStorage.getItem("userAddress");
  const { refetchRestaurants } = useRestaurantContext();

  const onSelect = () => {
    setIsEditingAddress(false);
    refetchRestaurants();
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the modal from closing
    setIsEditingAddress(true);
  };

  return (
    <div className="relative">
      {/* Overlay when dropdown is open */}
      {isOpen && (
        <div
          className="fixed inset-x-0 sm:top-[125px] top-[100px] bg-black opacity-50 z-40 w-full h-full"
          onClick={() => setIsOpen(false)}
        />
      )}
      <DropdownMenu onOpenChange={setIsOpen}>
        {/* Control open state */}
        <DropdownMenuTrigger asChild>
          <button className="flex items-center h-8 gap-1 px-3 my-2 border border-gray-300 hover:border-gray-500 sm:w-full md:w-full lg:w-auto">
            <MdPlace />
            <span className="overflow-hidden font-bold whitespace-nowrap text-ellipsis">
              משלוח ל:
            </span>
            <div className="text-right truncate pl-4 max-w-[150px] sm:max-w-[150px] md:max-w-[150px] lg:max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
              {userAddress}
            </div>
            <IoIosArrowDown />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="center"
          className="bg-white h-[600px] w-[400px]  overflow-hidden p-4 border-2 flex  flex-col z-50"
          style={{ direction: "rtl" }}
        >
          <div className="flex justify-center">
            <Button
              className={`px-16 py-6 font-extrabold rounded-s-lg border-2 shadow-sm hover:bg-current/100  ${
                selected === "delivery"
                  ? "bg-slate-700 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setSelected("delivery")}
            >
              משלוח
            </Button>
            <Button
              className={`px-16 py-6 font-extrabold rounded-e-lg border-2 shadow-sm hover:bg-current/100 ${
                selected === "pickup"
                  ? "bg-slate-700 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => setSelected("pickup")}
            >
              פיקאפ
            </Button>
          </div>

          {/* Display address change or add new address */}
          {!isEditingAddress ? (
            <>
              <DropdownMenuItem
                asChild
                className="shadow-sm border-b-2 hover:cursor-pointer"
              >
                <div className="h-14 mt-4 mb-10 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">כתובת נוכחית</h3>
                    <div className="text-clip truncate">{userAddress}</div>
                  </div>
                  <Button className="h-full" onClick={handleEditClick}>
                    <img
                      src="https://cdn.10bis.co.il/10bis-spa-static-prod/assets/pencil-white-7939a7.svg"
                      alt="edit-img"
                    />
                  </Button>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="mt-auto">
                <div className="flex justify-center h-12">
                  <Button
                    onClick={handleEditClick}
                    className="w-full h-full font-extrabold"
                  >
                    הוספת כתובת חדשה
                  </Button>
                </div>
              </DropdownMenuItem>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center space-y-4 mt-4">
              <h3 className="text-xl">הזן כתובת חדשה</h3>
              <PlacesAutocomplete onSelect={onSelect} />
              <div className="flex space-x-4 mt-4">
                <Button
                  onClick={() => setIsEditingAddress(false)}
                  className="w-full"
                  variant={"destructive"}
                >
                  ביטול
                </Button>
              </div>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
