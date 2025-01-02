import { Link } from "react-router-dom";
import { MdPlace } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { Input } from "../ui/input";

const Navbar = () => {
  return (
    <>
      <nav className="sticky top-0 z-50 bg-backgroundOrange text-foreground border-b border-border shadow-sm px-32">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center justify-center space-x-1 transition-transform duration-300 hover:scale-110"
          >
            <img
              className="w-28"
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
      <div className="px-24 shadow-lg mb-4">
        <div className="gap-6 flex px-10 items-center">
          <button className="border border-gray-300 my-2 px-3 h-8 hover:border-gray-500">
            <div className="flex items-center gap-1">
              <MdPlace />
              <span className="font-bold overflow-hidden whitespace-nowrap text-ellipsis">
                משלוח ל:
              </span>
              <div className="text-right truncate max-w-[150px] overflow-hidden whitespace-nowrap text-ellipsis">
                החילזון 3 , רמת גן
              </div>
              <IoIosArrowDown />
            </div>
          </button>
          <div className="flex items-center">
            <div className="border flex items-center gap-2 px-2 h-8  border-gray-300 hover:border-gray-500">
              <FiSearch className="hover:cursor-pointer" />
              <Input
                type="text"
                placeholder="מנות, מסעדות או סוגי אוכל"
                className="border-none h-4 text-sm "
              />
            </div>
          </div>
          <div>
            <button className="h-8 flex items-center border border-gray-300 hover:border-gray-500 px-2">
              <div className="p-2"> הזמנה חוזרת</div>
              <IoIosArrowDown />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
