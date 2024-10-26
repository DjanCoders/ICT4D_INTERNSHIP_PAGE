import React from 'react';
// import Chart from '../Chart/Chart';
import Navbar from '../NavBar/NavBar';
// import ProgressBar from '../ProgressBar/ProgressBar';
import Sidebar from '../SideBar/Sidebar';
import { Outlet } from 'react-router-dom';
import './adminlayout.scss';

function AdminLayout() {
    //
    return (
        <div className="home">
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="home_main">
                <Navbar />

                <div className="bg_color" />
               
                <main>
                <Outlet /> {/* Renders child routes */}
        </main>

            </div>
        </div>
    );
}

export default AdminLayout;