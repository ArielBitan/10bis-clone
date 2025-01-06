import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import DetailPage from "./pages/DetailPage/DetailPage";
import EditRestaurant from "./pages/EditRestaurant/EditRestaurant";
import CourierPage from "./pages/CourierPage/CourierPage";

const App: React.FC = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/restaurant/:id" element={<DetailPage />} />
        <Route path="/courier" element={<CourierPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* modal */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/edit-restaurant" element={<EditRestaurant />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
