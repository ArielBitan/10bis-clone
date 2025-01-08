import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import DetailPage from "./pages/DetailPage/DetailPage";
import EditRestaurant from "./pages/EditRestaurant/EditRestaurant";
import CourierPage from "./pages/CourierPage/CourierPage";
import MenuEdit from "./pages/MenuEdit/MenuEdit";

const App: React.FC = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <div className="App">
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/restaurant/:id" element={<DetailPage />} />
        <Route path="/courier" element={<CourierPage />} />
        <Route path="/menu-edit" element={<MenuEdit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/edit-restaurant" element={<EditRestaurant />} />
          {/* <Route path="/active-orders" element={<ActiveOrders />} /> */}
        </Routes>
      )}
    </div>
  );
};

export default App;
