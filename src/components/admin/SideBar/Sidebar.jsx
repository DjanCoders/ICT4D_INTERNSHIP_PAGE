import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import CreditCardIcon from '@mui/icons-material/CreditCard';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
// import PersonIcon from '@mui/icons-material/Person';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
// import TableChartIcon from '@mui/icons-material/TableChart';
import GroupIcon from '@mui/icons-material/Group';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AssessmentIcon from '@mui/icons-material/Assessment';
import EditIcon from '@mui/icons-material/Edit';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import RateReviewIcon from '@mui/icons-material/RateReview';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ColorContext } from '../../ColorContext/darkContext';
import './Sidebar.scss';

function Sidebar() {
    // color state management using react context
    const { darkMode, dispatch } = useContext(ColorContext);

    return (
        <div className="sidebar">
            <div className="logo">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h3 className="text_none">AdminDashboard</h3>
                </Link>
            </div>

            <div className="links">
                <ul>
                    <p className="spann">Main</p>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <li>
                            <DashboardIcon className="icon" /> Dashboard
                        </li>
                    </Link>

                    <p className="spann">lists</p>
                    <Link to="/applicants" style={{ textDecoration: 'none' }}>
                        <li>
                            <GroupIcon className="icon" /> All Applicants
                        </li>
                    </Link>

                    <Link to="/applicants/approved" style={{ textDecoration: 'none' }}>
                        <li>
                            <HowToRegIcon className="icon" /> Approved 
                        </li>
                    </Link>
                    <Link to="/applicants/pending" style={{ textDecoration: 'none' }}>
                        <li>
                            <PendingActionsIcon className="icon" /> Pending 
                        </li>
                    </Link>
                    <p className="spann">Exams</p>
                    <Link to="/admin/exam-editor" style={{ textDecoration: 'none' }}>
                        <li>
                            <EditIcon className="icon" /> Exam Editor
                        </li>
                    </Link>

                    <Link to="/admin/review-submissions" style={{ textDecoration: 'none' }}>
                        <li>
                            <SettingsApplicationsIcon className="icon" /> Exam Settings
                        </li>
                    </Link>

                    <Link to="/exam/review" style={{ textDecoration: 'none' }}>
                        <li>
                            <RateReviewIcon className="icon" /> Review 
                        </li>
                    </Link>                    

                    <p className="spann">Reports</p>
                    <Link to="/reports" style={{ textDecoration: 'none' }}>
                        <li>
                            <AssessmentIcon className="icon" /> Reports
                        </li>
                    </Link>
                   

                    <p className="spann">Seetings</p>
                    <li>
                        <AccountCircleIcon className="icon" /> Profile
                    </li>
                    <li>
                        <SettingsRoundedIcon className="icon" /> Setting
                    </li>
                    <li>
                        <LogoutIcon className="icon" /> Log Out
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;