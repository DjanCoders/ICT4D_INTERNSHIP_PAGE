import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import ApplicationForm from "./pages/applicationform";
import UserProfile from "./components/profile/Profile";
import Layout from "./components/Layout";
import CreateExam from "./components/admin/CreateExam/CreateExam";
import ExamSettings from "./components/admin/ExamSetting/ExamSettings";
import ReviewSubmissions from "./components/admin/RevieSubmission/ReviewSubmissions";

import AdminHome from "./components/admin/Home/AdminHome";
import AdminLayout from "./components/admin/AdminLayout/AdminLayout";
import Home from "./pages/Home";
import InternshipForm from "./components/admin/Internship/InternshipAreaForm";
import WorkAreaDetails from "./components/admin/Internship/WorkAreaDetial";
import Reports from "./components/admin/reports/ReportsPage";
import { ApplicantContextProvider } from "./components/ApplicantContext/ApplicantContext";
import TakeExam from "./components/applicant/TakeExam";
import { Profile } from "./types";

const App = () => {
  const { token } = useAuth();

const profile: Profile = {
  id: 1,
  full_name: "John Doe",
  bio: "Hello!",
  is_internee: false,
  avatar: new File([], "avatar.jpg"), // must be File
  user: {
    id: 123,
    username: "johndoe",
    email: "john@example.com",
    first_name: "John",
    last_name: "Doe",
    is_superuser: false,
  },
};



  return (
    <div className="my-8 text-center">
      <Routes>
        {/* Public Routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfile profile={profile} />} />
          <Route path="/apply" element={<ApplicationForm />} />
          <Route path="/applicant/take-exam" element={<TakeExam />} />
          
        </Route>

        {/* Protected Admin Routes */}
        {token ? (
          <Route
            element={
              <ApplicantContextProvider>
                <AdminLayout />
              </ApplicantContextProvider>
            }
          >
            <Route path="/admin" element={<AdminHome status="all" />} />
            <Route path="/admin/applicants/approved" element={<AdminHome status="Approved" />} />
            <Route path="/admin/applicants/pending" element={<AdminHome status="Pending" />} />
            <Route path="/admin/applicants/rejected" element={<AdminHome status="Rejected" />} />
            <Route path="/admin/work-area-details" element={<WorkAreaDetails />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/exam-create" element={<CreateExam question={null} isEditMode={false} />} />
            <Route path="/admin/exam-settings" element={<ExamSettings />} />
            <Route path="/admin/review-submissions" element={<ReviewSubmissions />} />
            <Route path="/admin/internship-form" element={<InternshipForm />} />
          </Route>
        ) : (
          // Redirect to login if not authenticated
          <Route path="*" element={<Navigate to="/" replace />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
