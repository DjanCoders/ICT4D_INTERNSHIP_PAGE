import React from 'react';
// import Chart from '../Chart/Chart';
// import ItemLists from '../ItemLists/ItemLists';
// import Navbar from '../NavBar/NavBar';
// import ProgressBar from '../ProgressBar/ProgressBar';
// import Sidebar from '../SideBar/Sidebar';

import TableList from '../TableList/TableList';
// import { Outlet } from 'react-router-dom';
import './Home.scss';

function AdminHome({status}) {
   
    return (
        
           

        <>
            <div className="table">
                <TableList status={status} />
            </div>
        </>
    );
}

export default AdminHome;