import { React ,useContext} from 'react';
// import Chart from '../Chart/Chart';
import Navbar from '../NavBar/NavBar';
// import ProgressBar from '../ProgressBar/ProgressBar';
import Sidebar from '../SideBar/Sidebar';
import { Outlet } from 'react-router-dom';
import ItemLists from '../ItemLists/ItemLists';
import './adminlayout.scss';
import { ColorContext } from '../../ColorContext/DarkContext';

function AdminLayout() {

  
    const { darkMode } = useContext(ColorContext);
    return (
        <div className="home" style={{
                    background: darkMode ? '#333' : '#fff',
                    color: darkMode ? '#fff' : '#000'
        }}>
            <div className="home_sidebar">
                <Sidebar />
            </div>

            <div className="home_main">
                <Navbar />

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