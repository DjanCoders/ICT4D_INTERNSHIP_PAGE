import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import LanguageIcon from '@mui/icons-material/Language';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import React, { useContext, useEffect ,useState } from 'react';
import { Link } from 'react-router-dom';
import { ColorContext } from '../../ColorContext/DarkContext';
import axios from 'axios'
import { Modal, Button } from '@mui/material'; 


// import sass file
import './navbar.scss';

// import images
import admin from '../../Images/admin_pic.jpg';

function Navbar() {
    const [unreadNotifications, setUnreadNotifications] = useState(0);
    const [notificationList, setNotificationList] = useState([]);
    const [open, setOpen] = useState(false);
    const [toggle, setToggle] = useState(false);
    // color state management using react context
    const { darkMode, dispatch } = useContext(ColorContext);

    const handleToggle = () => {
        setToggle(!toggle);
    };
      // Fetch unread notifications count
      const fetchNotifications = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/notifications/');
            setUnreadNotifications(0);
            setNotificationList(response.data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };
   
    const handleNotificationIconClick = () => {
        setOpen(true)
      };
    const handleClose = () => setOpen(false);
    const markNotificationsAsRead = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/notifications/');
            setUnreadNotifications(0);
            setNotificationList(response.data);
            setOpen(false)
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    }
    useEffect(() => {
        fetchNotifications(); // Fetch notifications count on initial load
    }, []);

    return (
        <div className="navbar">
            <div className="navbar_main">
                <div className="menu_logo">
                    {toggle ? (
                        <CloseIcon className="menu_icon" onClick={handleToggle} />
                    ) : (
                        <MenuIcon className="menu_icon" onClick={handleToggle} />
                    )}

                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <h3 className="text_none">Dashboard</h3>
                    </Link>
                </div>
                <div className="search">
                    <input type="text" placeholder="Search.." />

                    <SearchIcon className="search_icon" />
                </div>

                <div className="item_lists">
                    <div className="item item_lan">
                        <LanguageIcon className="item_icon" />
                        <p>English</p>
                    </div>
                    <div className="item">
                        {!darkMode ? (
                            <DarkModeIcon
                                
                                className="item_icon"
                                onClick={() => dispatch({ type: 'TOGGLE' })}
                            />
                        ) : (
                            <LightModeIcon
                                className="item_icon white"
                                onClick={() => dispatch({ type: 'TOGGLE' })}
                            />
                        )}
                    </div>
                    <div className="item">
                        <FullscreenExitIcon className="item_icon" />
                    </div>

                   
                    <div className="item"> 
                        <NotificationsNoneIcon className="item_icon" onClick={handleNotificationIconClick } />
                        {unreadNotifications > 0 && <span className="badge">{unreadNotifications}</span>}
                        </div>

                    <div className="item">
                        <img className="admin_pic" src={admin} alt="admin" />
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="notification-modal-title"
                aria-describedby="notification-modal-description"
            >
                <div className="modal-content" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    backgroundColor: 'white',
                    border: '2px solid #000',
                    boxShadow: 24,
                    padding: '20px',
                    borderRadius: '8px',
                }}>
                    <h2 id="notification-modal-title">Notifications</h2>
                    {notificationList.length > 0 ? (
                        notificationList.map((notification) => (
                            <div key={notification.id} className="notification-item">
                                {notification.message}
                            </div>
                        ))
                    ) : (
                        <p id="notification-modal-description">No new notifications</p>
                    )}
                    <Button onClick={handleClose} variant="contained" color="primary" style={{ margin: '10px' }}>
                        Close
                    </Button>
                    {notificationList.length > 0 && <Button onClick={markNotificationsAsRead} variant="contained" color="primary" style={{ margin: '10px' }}>
                        Mark as Read
                    </Button>}
                </div>
            </Modal>
           
        </div>
    );
}

export default Navbar;