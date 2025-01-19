import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import DetailPage from "./pages/DetailPage/DetailPage";
import EditRestaurant from "./pages/EditRestaurant/EditRestaurant";
import CourierPage from "./pages/CourierPage/CourierPage";
import MenuEdit from "./pages/MenuEdit/MenuEdit";
import EditUser from "./pages/EditUser/EditUser";
import RestaurantOrderManagement from "./pages/RestaurantOrderManagement/RestaurantOrderManagement";
import OrderPage from "./pages/OrderPage/OrderPage";
import CourierRegister from "./pages/CourierRegister/CourierRegister";
import Charges from "./pages/Charges/Charges";
import Review from "./pages/Review/Review";
import AllChats from "./components/AllChats/AllChats";

const App: React.FC = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <div className="App">
      <AllChats />
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/restaurant/:id" element={<DetailPage />} />
        <Route path="/order/:id" element={<OrderPage />} />
        <Route path="/courier" element={<CourierPage />} />
        <Route path="/menu-edit" element={<MenuEdit />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/charges-report" element={<Charges />} />

        <Route
          path="/restaurant-order-management"
          element={<RestaurantOrderManagement />}
        />
        <Route path="/courier-register" element={<CourierRegister />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/edit-restaurant" element={<EditRestaurant />} />
          <Route path="/edit-user" element={<EditUser />} />
          <Route path="/restaurant/:id/review" element={<Review />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
