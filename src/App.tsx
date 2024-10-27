import React from "react";
import { Route, Routes } from "react-router-dom";
import ApplicationForm from "./pages/applicationform";
import Profile from "./components/profile/Profile";
import Layout from "./components/Layout";
import ExamEditor from "./components/admin/ExamEditor/ExamEditor";
import ExamSettings from "./components/admin/ExamSetting/ExamSettings";
import ReviewSubmissions from "./components/admin/RevieSubmission/ReviewSubmissions";
import ExamStart from "./components/applicant/ExamStart";
import ExamQuestion from "./components/applicant/ExamQuestion";
import ExamSubmission from "./components/applicant/ExamSubmission";
import AdminHome from "./components/admin/Home/AdminHome";
import AdminLayout from "./components/admin/AdminLayout/AdminLayout";
import Home from "./pages/Home";

const App = () => {
  const user = {
    username: "johndoe",
    email: "johndoe@example.com",
    department: "Software Development",
  };

  return (
    <div className="my-8 text-center">
      <Routes>
        {/* User Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/apply" element={<ApplicationForm />} />
          <Route path="/applicant/exam-start" element={<ExamStart />} />
          <Route path="/applicant/exam-question" element={<ExamQuestion />} />
          <Route path="/applicant/exam-submission" element={<ExamSubmission />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/exam-editor" element={<ExamEditor />} />
          <Route path="/admin/exam-settings" element={<ExamSettings />} />
          <Route path="/admin/review-submissions" element={<ReviewSubmissions />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
