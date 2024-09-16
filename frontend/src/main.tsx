import {} from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { LabContextProvider } from "./context/lab-context.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <LabContextProvider>
      <App />
    </LabContextProvider>
  </BrowserRouter>
);
