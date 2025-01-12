import { Link } from "react-router-dom";
import { MdPlace } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { Input } from "../ui/input";
import UserMenu from "./UserMenu";
import { useUser } from "../context/userContext";

const Navbar = () => {
  const { user } = useUser();

  const role = user?.role;

  return (
    <>
      <nav className="sticky top-0 z-50 px-6 shadow-sm bg-backgroundOrange text-foreground border-border sm:px-6 md:px-6 lg:px-32">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center justify-center space-x-1 transition-transform duration-300 hover:scale-110"
          >
            <img
              className="w-20 sm:w-20 md:w-20 lg:w-28"
              src="https://cdn.10bis.co.il/10bis-spa-static-prod/assets/white-logo-ec59fa.svg"
              alt="website-img"
            />
          </Link>
          <div className="flex items-center gap-4">
            <UserMenu />
            <img
              className="w-6"
              src="https://cdn.10bis.co.il/10bis-spa-static-prod/assets/he-cdb854.svg"
            />
          </div>
        </div>
      </nav>
      {role === "restaurant_owner" ? (
        <div></div>
      ) : (
        <div className="px-6 bg-white shadow-lg sm:px-6 md:px-6 lg:px-24">
          <div className="flex flex-wrap items-center justify-between gap-2 sm:px-6 md:px-6 lg:px-10">
            {/* Delivery button */}
            <button className="flex items-center h-8 gap-1 px-3 my-2 border border-gray-300 hover:border-gray-500 sm:w-full md:w-full lg:w-auto">
              <MdPlace />
              <span className="overflow-hidden font-bold whitespace-nowrap text-ellipsis">
                משלוח ל:
              </span>
              <div className="text-right truncate max-w-[150px] sm:max-w-[150px] md:max-w-[150px] lg:max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
                החילזון 3 , רמת גן
              </div>
              <IoIosArrowDown />
            </button>

            {/* Search Input */}
            <div className="flex items-center w-full sm:w-full md:w-full lg:w-auto">
              <div className="flex items-center w-full h-8 gap-2 px-2 border border-gray-300 hover:border-gray-500">
                <FiSearch className="hover:cursor-pointer" />
                <Input
                  type="text"
                  placeholder="מנות, מסעדות או סוגי אוכל"
                  className="h-4 text-sm border-none "
                />
              </div>
            </div>

            {/* Reorder button */}
            <div className="w-full my-4 sm:w-full md:w-full lg:w-auto">
              <button className="flex items-center w-full h-8 px-2 border border-gray-300 hover:border-gray-500 sm:w-full md:w-full lg:w-auto">
                <div className="p-2 "> הזמנה חוזרת</div>
                <IoIosArrowDown />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
