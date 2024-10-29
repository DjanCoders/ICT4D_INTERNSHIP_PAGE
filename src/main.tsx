import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ColorContextProvider } from "./components/ColorContext/DarkContext.jsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
   <ColorContextProvider>
    <Router>
      <App />
        </Router>
       </ColorContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
