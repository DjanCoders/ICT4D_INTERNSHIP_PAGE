import { React ,useState,useContext} from 'react';
// import Chart from '../Chart/Chart';
import Navbar from '../NavBar/NavBar';
// import ProgressBar from '../ProgressBar/ProgressBar';
import Sidebar from '../SideBar/Sidebar';
import { Outlet } from 'react-router-dom';
import ItemLists from '../ItemLists/ItemLists';
import './adminlayout.scss';
import { ColorContext } from '../../ColorContext/DarkContext';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function AdminLayout() {

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const { darkMode } = useContext(ColorContext);
    const handleToggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };
    return (
        <div className="home" style={{
                    background: darkMode ? '#333' : '#fff',
                    color: darkMode ? '#fff' : '#000'
        }}>
            <div className={`home_sidebar ${isSidebarVisible ? 'visible' : ''}`}>
            <Sidebar />
            </div>

            <div className="home_main">
          
                    <Navbar />
                    <div className="menu_logo">
                    
                    
                    <MenuIcon className="menu_icon" onClick={handleToggleSidebar} />
                          
      
                          <Link to="/" style={{ textDecoration: 'none' }}>
                              <h3 className="text_none">Dashboard</h3>
                          </Link>
                </div> 
                <div className="bg_color" />
                
                    <div className="home_items">
                        <ItemLists  type="totalApplicants" />
                        <ItemLists type="approvedApplicants" />
                        <ItemLists type="pendingApplicants" />
                        <ItemLists  type="rejectedApplicants" />
                    </div>
                
                <main>
                  {/* Outlet is used as a placeholder for rendering child 
                  routes within a parent route. */}  
                <Outlet /> {/* Renders child routes */}
               </main>

            </div>
        </div>
    );
}

export default AdminLayout;