import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { UserProvider } from "./providers/UserProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider> 
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
