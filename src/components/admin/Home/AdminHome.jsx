import React from 'react';
// import Chart from '../Chart/Chart';
import ItemLists from '../ItemLists/ItemLists';
// import Navbar from '../NavBar/NavBar';
// import ProgressBar from '../ProgressBar/ProgressBar';
// import Sidebar from '../SideBar/Sidebar';
import TableList from '../TableList/TableList';
// import { Outlet } from 'react-router-dom';
import './Home.scss';

function AdminHome() {
    //
    return (
        
           

        <>
           
            <div className="home_items">
                <ItemLists type="totalApplicants" />
                <ItemLists type="approvedApplicants" />
                <ItemLists type="pendingApplicants" />
                <ItemLists type="rejectedApplicants" />
            </div>

                

            <div className="table">
                <div className="title">Latest Transactions</div>
                <TableList />
            </div>
        </>
    );
}

export default AdminHome;