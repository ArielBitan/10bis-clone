import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./components/context/userContext.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import { SocketProvider } from "./components/context/socketContext.tsx";
import { RestaurantProvider } from "./components/context/restaurantContext.tsx";
// import AllChats from "./components/AllChats.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <SocketProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <RestaurantProvider>
              <App />
              <Toaster />
            </RestaurantProvider>
            {/* <AllChats/> */}
          </QueryClientProvider>
        </BrowserRouter>
      </SocketProvider>
    </UserProvider>
  </StrictMode>
);
