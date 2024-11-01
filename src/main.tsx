import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ColorContextProvider } from "./components/ColorContext/DarkContext.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ColorContextProvider>
        <UserProvider>
    <Router>
      <App />
          </Router>
          </UserProvider>
       </ColorContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
