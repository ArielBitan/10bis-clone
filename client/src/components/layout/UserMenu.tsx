import { useEffect } from "react";
import { useUser } from "../context/userContext";
import UserIcon from "./UserIcon";
import LogInModal from "../LandingPage/modals/LoginModal";
import { Link, useLocation } from "react-router-dom";

const UserMenu = () => {
  const { user, fetchUser } = useUser();
  const location = useLocation();
  const role = user?.role;

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        role === "restaurant_owner" ? (
          <div className="flex items-center gap-2">
            <Link
              to="/edit-restaurant"
              state={{ backgroundLocation: location }}
            >
              <div>
                <UserIcon width={40} height={40} fill="#000" />
              </div>
            </Link>
            <div className="font-medium text-white">{`היי , ${user.first_name}`}</div>
          </div>
        ) : (
          <div>
            <UserIcon width={40} height={40} fill="#000" />
          </div>
        )
      ) : (
        <LogInModal rolee="login" isHomePage={true} />
      )}
    </div>
  );
};

export default UserMenu;
