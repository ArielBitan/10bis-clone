import { Link } from "react-router-dom";
import { MdPlace } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { Input } from "../ui/input";

const Navbar = () => {
  return (
    <>
      <nav className="sticky top-0 z-50 bg-backgroundOrange text-foreground border-b border-border shadow-sm px-6 sm:px-6 md:px-6 lg:px-32">
        <div className="flex justify-between items-center py-3">
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
          <div className="flex gap-4">
            <Link
              to="/login"
              className="text-lg text-white px-4 py-2 rounded-lg transition-transform duration-300 hover:scale-110"
            >
              כניסה
            </Link>
            <img
              className="w-6"
              src="https://cdn.10bis.co.il/10bis-spa-static-prod/assets/he-cdb854.svg"
            />
          </div>
        </div>
      </nav>
      <div className="px-6 sm:px-6 md:px-6 lg:px-24 shadow-lg bg-white">
        <div className="gap-2 flex flex-wrap justify-between items-center sm:px-6 md:px-6 lg:px-10">
          {/* Delivery button */}
          <button className="border border-gray-300 my-2 px-3 h-8 hover:border-gray-500 flex items-center gap-1 sm:w-full md:w-full lg:w-auto">
            <MdPlace />
            <span className="font-bold overflow-hidden whitespace-nowrap text-ellipsis">
              משלוח ל:
            </span>
            <div className="text-right truncate max-w-[150px] sm:max-w-[150px] md:max-w-[150px] lg:max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
              החילזון 3 , רמת גן
            </div>
            <IoIosArrowDown />
          </button>

          {/* Search Input */}
          <div className="flex items-center w-full sm:w-full md:w-full lg:w-auto">
            <div className="border flex items-center gap-2 px-2 h-8 border-gray-300 hover:border-gray-500 w-full">
              <FiSearch className="hover:cursor-pointer" />
              <Input
                type="text"
                placeholder="מנות, מסעדות או סוגי אוכל"
                className="border-none h-4 text-sm "
              />
            </div>
          </div>

          {/* Reorder button */}
          <div className="w-full sm:w-full md:w-full lg:w-auto my-4">
            <button className="h-8 flex items-center border border-gray-300 hover:border-gray-500 px-2 w-full sm:w-full md:w-full lg:w-auto">
              <div className="p-2 "> הזמנה חוזרת</div>
              <IoIosArrowDown />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
