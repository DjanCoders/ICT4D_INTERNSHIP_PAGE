import Home from "./pages/Home";
import ApplicationForm from "./pages/applicationform";
import { Route, Routes } from "react-router-dom";
import "./styles.css";
import Profile from "./components/profile/Profile";
import Layout from "./components/Layout";
import ExamEditor from "./components/admin/ExamEditor.jsx";
import ExamSettings from "./components/admin/ExamSettings.jsx";
import ReviewSubmissions from "./components/admin/ReviewSubmissions.jsx";
import ExamStart from "./components/applicant/ExamStart.jsx";
import ExamQuestion from "./components/applicant/ExamQuestion.jsx";
import ExamSubmission from "./components/applicant/ExamSubmission.jsx";

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
					<Route path="/admin/exam-editor" element={<ExamEditor />} />
					<Route path="/admin/exam-settings" element={<ExamSettings />} />
					<Route path="/admin/review-submissions" element={<ReviewSubmissions />} />

					{/* Applicant Routes */}
					<Route path="/applicant/exam-start" element={<ExamStart />} />
					<Route path="/applicant/exam-question" element={<ExamQuestion />} />
					<Route path="/applicant/exam-submission" element={<ExamSubmission />} />
				</Routes>
			</Layout>
		</div>
	);
};

export default App;
