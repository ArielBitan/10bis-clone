import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import { useUser } from "../context/userContext";
import Search from "./Search";
import AddressDropdown from "./AddressDropdown";

const Navbar = () => {
  const { user } = useUser();

  const role = user?.role;

  return (
    <>
      <nav className="sticky top-0 z-50 px-6 border-b shadow-sm bg-backgroundOrange text-foreground border-border sm:px-6 md:px-6">
        <div className="lg:max-w-[1250px] mx-auto">
          <div className="flex items-center justify-between py-4">
            <Link
              to="/home"
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
          {role !== "restaurant_owner" ? (
            <div></div>
          ) : (
            <div>
              <div className="px-6 sm:px-6 md:px-6 lg:px-24">
                <div className="flex justify-between gap-4 sm:px-6 md:px-6 lg:px-10 items-center">
                  <Link
                    to="/home"
                    className="px-4 py-2 text-lg font-semibold text-gray-700 hover:text-backgroundOrange transition-all duration-300 rounded-lg cursor-pointer hover:bg-gray-100 hover:shadow-lg"
                  >
                    עמוד הבית
                  </Link>
                  <Link
                    to="/menu-edit"
                    className="px-4 py-2 text-lg font-semibold text-gray-700 hover:text-backgroundOrange transition-all duration-300 rounded-lg cursor-pointer hover:bg-gray-100 hover:shadow-lg"
                  >
                    עריכת התפריט
                  </Link>
                  <Link
                    to="/restaurant-order-management"
                    className="px-4 py-2 text-lg font-semibold text-gray-700 hover:text-backgroundOrange transition-all duration-300 rounded-lg cursor-pointer hover:bg-gray-100 hover:shadow-lg"
                  >
                    ניהול הזמנות
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
      {role === "restaurant_owner" ? (
        <div></div>
      ) : (
        <div className="px-6 bg-white shadow-sm sm:px-6 md:px-6">
          <div className="max-w-[1330px] mx-auto flex flex-wrap items-center gap-6 sm:px-6 md:px-6 lg:px-10">
            <AddressDropdown />
            <Search />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
