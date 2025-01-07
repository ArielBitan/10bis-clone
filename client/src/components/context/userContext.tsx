import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { IRestaurantOwner, IUser } from "@/types/userType";

interface UserContextType {
  user: IUser | IRestaurantOwner | null;
  fetchUser: () => void;
  setUser: (user: IUser | IRestaurantOwner | null) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<IUser | IRestaurantOwner | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  console.log(user);
  const fetchUser = () => {
    const token = Cookies.get("jwt");
    if (token) {
      try {
        const decodedToken = jwtDecode<IUser | IRestaurantOwner>(token);
        setUser(decodedToken);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      fetchUser,
      setUser,
      logout,
    }),
    [user]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
