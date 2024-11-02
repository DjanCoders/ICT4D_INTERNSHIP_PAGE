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
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import AssessmentIcon from '@mui/icons-material/Assessment';
import EditIcon from '@mui/icons-material/Edit';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import RateReviewIcon from '@mui/icons-material/RateReview';
import CreateIcon from '@mui/icons-material/Create';
import DetailsIcon from '@mui/icons-material/Info';

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ColorContext } from '../../ColorContext/DarkContext';
import './Sidebar.scss';

function Sidebar({ onLinkClick }) {
    // color state management using react context
    //destruct the object and get only darkMode object
    const {darkMode} = useContext(ColorContext);
    const colorStyle={
          color: darkMode ? '#fff' : '#000'
          }
    return (
        <div className="sidebar" style={colorStyle}>
            <div className="logo">
                <Link to="/admin" style={{ textDecoration: 'none' }} onClick={onLinkClick}>
                    <h3 style={colorStyle} className="text_none">AdminDashboard</h3>
                </Link>
            </div>

            <div className="links" style={colorStyle} >
                <ul>
                    <p className="spann" style={colorStyle} >Main</p>
                    <Link  onClick={onLinkClick} to="/" style={{ textDecoration: 'none' }}>
                        <li style={colorStyle} >
                            <DashboardIcon className="icon" /> Home
                        </li>
                    </Link>

                    <p className="spann" style={colorStyle} >lists</p>
                    <Link  onClick={onLinkClick} to="/admin" style={{ textDecoration: 'none' }}>
                        <li style={colorStyle} >
                            <GroupIcon className="icon" /> All Applicants
                        </li>
                    </Link>

                    <Link  onClick={onLinkClick} to="/admin/applicants/approved" style={{ textDecoration: 'none' }}>
                        <li style={colorStyle} >
                            <HowToRegIcon className="icon" /> Approved 
                        </li>
                    </Link>
                    <Link  onClick={onLinkClick} to="/admin/applicants/pending" style={{ textDecoration: 'none' }}>
                        <li style={colorStyle} >
                            <PendingActionsIcon className="icon" /> Pending 
                        </li>
                    </Link>
                    <Link  onClick={onLinkClick} to="/admin/applicants/rejected" style={{ textDecoration: 'none' }}>
                        <li style={colorStyle} >
                            <HighlightOffIcon className="icon" /> Rejected 
                        </li>
                    </Link>
                    <p className="spann" style={colorStyle} >Exams</p>
                    <Link  onClick={onLinkClick} to="admin/exam-create" style={{ textDecoration: 'none' }}>
                        <li style={colorStyle} >
                            <EditIcon className="icon" /> Create Exam
                        </li>
                    </Link>

                    <Link  onClick={onLinkClick} to="/admin/exam-settings" style={{ textDecoration: 'none' }}>
                        <li style={colorStyle} >
                            <SettingsApplicationsIcon className="icon" /> Exam Settings
                        </li>
                    </Link>

                    <Link  onClick={onLinkClick} to="/admin/review-submissions" style={{ textDecoration: 'none' }}>
                        <li style={colorStyle} >
                            <RateReviewIcon className="icon" /> Review 
                        </li>
                    </Link>                    

                    <p className="spann" style={colorStyle} >Internship Area</p>
                    <Link onClick={onLinkClick} to="admin/internship-form" style={{ textDecoration: 'none' }}>
                        <li style={colorStyle} >
                            <CreateIcon className="icon" /> Add Work Area
                        </li>
                    </Link>
                    <Link onClick={onLinkClick} to="admin/work-area-details" style={{ textDecoration: 'none' }}>
                        <li style={colorStyle} >
                            <DetailsIcon className="icon" />  Work Area Detial
                        </li>
                    </Link>
                    
                    <p className="spann" style={colorStyle} >Reports</p>
                    <Link onClick={onLinkClick} to="admin/reports" style={{ textDecoration: 'none' }}>
                        <li style={colorStyle} >
                            <AssessmentIcon className="icon" /> Reports
                        </li>
                    </Link>
                   

                    <p className="spann" style={colorStyle} >Seetings</p>
                    <li style={colorStyle} >
                        <AccountCircleIcon className="icon" /> Profile
                    </li>
                    <li style={colorStyle} >
                        <SettingsRoundedIcon className="icon" /> Setting
                    </li>
                    <li style={colorStyle} >
                        <LogoutIcon className="icon" /> Log Out
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;