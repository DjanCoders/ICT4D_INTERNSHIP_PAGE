import Home from "./pages/Home";
import ApplicationForm from "./pages/applicationform";
import { Route, Routes } from "react-router-dom";
import "./styles.css";
import Profile from "./components/profile/Profile";
import Layout from "./components/Layout";

const App = () => {
  const user = {
    username: "johndoe",
    email: "johndoe@example.com",
    department: "Software Development",
  };
  return (
    <div className="my-8 text-center">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/apply" element={<ApplicationForm />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default App;
