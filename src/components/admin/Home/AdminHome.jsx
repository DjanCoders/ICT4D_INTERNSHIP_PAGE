import React from 'react';
// import Chart from '../Chart/Chart';
// import ItemLists from '../ItemLists/ItemLists';
// import Navbar from '../NavBar/NavBar';
// import ProgressBar from '../ProgressBar/ProgressBar';
// import Sidebar from '../SideBar/Sidebar';
import { ColorContext } from '../../ColorContext/DarkContext';
import { useContext } from 'react'
import TableList from '../TableList/TableList';
// import { Outlet } from 'react-router-dom';
import './Home.scss';

function AdminHome() {
    const { darkMode } = useContext(ColorContext);
    const colorStyle={
        color: darkMode ? '#fff' : '#000'
        }
    return (
        
           

        <>
            <div className="table">
                <div className="title" style={colorStyle}>Latest Applications</div>
                <TableList />
            </div>
        </>
    );
}

export default AdminHome;