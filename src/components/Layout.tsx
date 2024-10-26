import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet to render nested routes
import Navbar from "./NavBar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <header className="fixed w-full top-0 right-0">
        <Navbar />
      </header>
      <main style={{ paddingTop: "70px" }}>
        <Outlet /> {/* Outlet will render child routes */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
