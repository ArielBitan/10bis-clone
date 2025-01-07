import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./pages/NotFound";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import EditRestaurant from "./pages/EditRestaurant/EditRestaurant";

const App: React.FC = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <div className="App">
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/edit-restaurant" element={<EditRestaurant />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
