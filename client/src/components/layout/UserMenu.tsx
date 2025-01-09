import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import { useUser } from "../context/userContext";
import UserIcon from "./UserIcon";
import LogInModal from "../LandingPage/modals/LoginModal";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const UserMenu = () => {
  const { user, fetchUser } = useUser();
  const location = useLocation();
  const role = user?.role;

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogOut = () => {
    Cookies.remove("jwt");
    window.location.href = "/";
  };

  return (
    <div>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="font-medium text-white">{`היי , ${user.first_name}`}</div>
                <UserIcon width={40} height={40} fill="#000" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-34">
            <DropdownMenuLabel>הפרופיל שלי</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <span>פרופיל</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="/edit-user" state={{ backgroundLocation: location }}>
                  <div>עריכת פרטי משתמש</div>
                </Link>
              </DropdownMenuItem>
              {role === "restaurant_owner" && (
                <DropdownMenuItem>
                  <Link
                    to="/edit-restaurant"
                    state={{ backgroundLocation: location }}
                  >
                    <div>עריכת פרטי מסעדה</div>
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span onClick={handleLogOut}>התנתקות</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <LogInModal rolee="login" isHomePage={true} />
      )}
    </div>
  );
};

export default UserMenu;
