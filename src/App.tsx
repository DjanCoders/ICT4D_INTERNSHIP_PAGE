import React from "react";
import { Route, Routes } from "react-router-dom";
import ApplicationForm from "./pages/applicationform";
import UserProfile from "./components/profile/Profile";
import Layout from "./components/Layout";
import CreateExam from "./components/admin/CreateExam/CreateExam";
import ExamSettings from "./components/admin/ExamSetting/ExamSettings";
import ReviewSubmissions from "./components/admin/RevieSubmission/ReviewSubmissions";
import ExamStart from "./components/applicant/ExamStart";
import ExamQuestion from "./components/applicant/ExamQuestion";
import ExamSubmission from "./components/applicant/ExamSubmission";
import AdminHome from "./components/admin/Home/AdminHome";
import AdminLayout from "./components/admin/AdminLayout/AdminLayout";
import Home from "./pages/Home";
import InternshipForm from "./components/admin/Internship/InternshipAreaForm";
import WorkAreaDetails from "./components/admin/Internship/WorkAreaDetial";
import Reports from "./components/admin/reports/ReportsPage";
import { ApplicantContextProvider } from "./components/ApplicantContext/ApplicantContext";
import TakeExam from "./components/applicant/TakeExam";

const App = () => {
  const profile = {
    user: {
      username: "jhondoe",
      email: "johndoe@example.com",
      is_superuser: false,
    },
    avatar: "avatar",
  };

  return (
    <div className="my-8 text-center">
      <Routes>
        {/* User Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfile profile={profile} />} />
          <Route path="/apply" element={<ApplicationForm />} />
          <Route path="/applicant/exam-start" element={<ExamStart />} />
          <Route path="/applicant/take-exam" element={<TakeExam />} />

          <Route path="/applicant/exam-question" element={<ExamQuestion />} />
          <Route
            path="/applicant/exam-submission"
            element={<ExamSubmission />}
          />
        </Route>

        {/* Admin Routes */}
        <Route
          element={
            <ApplicantContextProvider>
              <AdminLayout />
            </ApplicantContextProvider>
          }
        >
          <Route path="/admin" element={<AdminHome status="all" />} />
          <Route
            path="/admin/applicants/approved"
            element={<AdminHome status="Approved" />}
          />
          <Route
            path="/admin/applicants/pending"
            element={<AdminHome status="Pending" />}
          />
          <Route
            path="/admin/applicants/rejected"
            element={<AdminHome status="Rejected" />}
          />
          <Route
            path="/admin/work-area-details"
            element={<WorkAreaDetails />}
          />
          <Route path="/admin/reports" element={<Reports />} />
          <Route
            path="/admin/exam-create"
            element={<CreateExam question={null} isEditMode={false} />}
          />
          <Route path="/admin/exam-settings" element={<ExamSettings />} />
          <Route
            path="/admin/review-submissions"
            element={<ReviewSubmissions />}
          />
          <Route path="/admin/internship-form" element={<InternshipForm />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
