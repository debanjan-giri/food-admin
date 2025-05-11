import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./performance.css";
import App from "./App.jsx";

// Create root outside of render function for better performance
const root = createRoot(document.getElementById("root"));

// Disable StrictMode in production for better performance
// StrictMode causes double rendering in development
const AppWithStrictMode =
  process.env.NODE_ENV === "production" ? (
    <App />
  ) : (
    <StrictMode>
      <App />
    </StrictMode>
  );

// Use a more performant rendering approach
root.render(AppWithStrictMode);
