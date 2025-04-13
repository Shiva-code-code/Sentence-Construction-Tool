import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // ✅ Fix: removed ".tsx" extension
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  throw new Error("Root element not found");
}
