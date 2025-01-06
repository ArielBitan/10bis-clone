import { useEffect } from "react";
import { useUser } from "../context/userContext";
import UserIcon from "./UserIcon";
import { Link } from "react-router-dom";

const UserMenu = () => {
  const { user, fetchUser } = useUser();
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      {user ? (
        <div className="flex items-center gap-2">
          <UserIcon width={40} height={40} fill="#000" />
          <div className="text-white font-medium">{`היי , ${user.first_name}`}</div>
        </div>
      ) : (
        <Link to="login">כניסה</Link>
      )}
    </div>
  );
};

export default UserMenu;
