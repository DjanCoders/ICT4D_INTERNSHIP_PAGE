import Navbar from "./NavBar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <header className="fixed w-full top-0 right-0">
        <Navbar />
      </header>{" "}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
