import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const DEV_RESTAURANT_ID = import.meta.env.VITE_DEV_RESTAURANT_ID;


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="menu-admin-sdk">
      <App restaurantId={DEV_RESTAURANT_ID} themeColor="green" />
    </div>
  </StrictMode>,
);
