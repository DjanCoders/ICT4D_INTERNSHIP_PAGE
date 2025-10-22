import React, { useRef, useEffect, useState, useContext } from 'react';
import Navbar from '../NavBar/NavBar';
import Sidebar from '../SideBar/Sidebar';
import { Outlet } from 'react-router-dom';
import ItemLists from '../ItemLists/ItemLists';
import './adminlayout.scss';
import { ColorContext } from '../../ColorContext/DarkContext';

function AdminLayout() {
    const sidebarRef = useRef(null);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const { darkMode } = useContext(ColorContext);

    // Toggle sidebar visibility
    const handleToggleSidebar = () => {
        setIsSidebarVisible(prev => !prev);
    };

    useEffect(() => {
        // Function to close sidebar if clicked outside
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarVisible(false);
            }
        };

        // Add click event listener to the entire document
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup function to remove the event listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            className="home"
            style={{
                background: darkMode ? '#333' : '#fff',
                color: darkMode ? '#fff' : '#000',
            }}
        >
            {/* Sidebar that overlays content when visible */}
            <div
                ref={sidebarRef}
                className={`home_sidebar ${isSidebarVisible ? 'visible' : ''}`}
            >
                <Sidebar onLinkClick={() => setIsSidebarVisible(false)} />
            </div>

            {/* Main content */}
            <div className="home_main">
                <Navbar onToggleSidebar={handleToggleSidebar} />
                        <div className="bg_color" />

                                <div className="home_items">
                                    <ItemLists type="totalApplicants" />
                                    <ItemLists type="approvedApplicants" />
                                    <ItemLists type="pendingApplicants" />
                                    <ItemLists type="rejectedApplicants" />
                                </div>

                        <main>
                            <Outlet />
                        </main>
                    </div>
            </div>
    );
}

export default AdminLayout;
