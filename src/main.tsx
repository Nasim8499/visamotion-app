import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

if ("serviceWorker" in navigator) {
  const swUrl = new URL("sw.js", document.baseURI).toString();
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(swUrl, { scope: "./" }).catch(() => {});
  });
}
