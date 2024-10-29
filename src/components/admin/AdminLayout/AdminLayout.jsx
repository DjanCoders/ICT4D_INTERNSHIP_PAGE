import { React ,useContext,useState,useEffect } from 'react';
// import Chart from '../Chart/Chart';
import Navbar from '../NavBar/NavBar';
// import ProgressBar from '../ProgressBar/ProgressBar';
import Sidebar from '../SideBar/Sidebar';
import { Outlet } from 'react-router-dom';
import ItemLists from '../ItemLists/ItemLists';
import './adminlayout.scss';
import { ColorContext } from '../../ColorContext/DarkContext';
import axios from 'axios';

function AdminLayout() {
    //
    const [applicant, setApplicant] = useState([])

    const [loading, setLoading] = useState(true)
    const [numberOfApplicants, setNumberOfApplicants] = useState(0);
    const [pendingApplicants, setPendingApplicants] = useState(0)
    const [rejectedgApplicants, setRejetedApplicants] = useState(0)
    const [approvedApplicants, setApprovedApplicants] = useState(0)


    const getData = async () => {
        const url = "http://127.0.0.1:8000/api/internship-application/";
        try {
            const response = await axios.get(url);
            const applicantData = response.data
            setApplicant(applicantData)
            setNumberOfApplicants(applicantData.length)
            setLoading(false)
            const approvedApplicants = applicant.filter((element) => {
                element.status = "approved";
            })
            const pendingApplicants = applicant.filter((element) =>{
                element.status = "Pending";
            })
            const rejectedgApplicants = applicant.filter((element) => {
                element.status = "rejected";
            })
            setPendingApplicants(pendingApplicants.length)
            setRejetedApplicants(rejectedgApplicants.length)
            setApprovedApplicants(approvedApplicants.length)
          
        } catch (error) {
            console.error("Error fetching  data", error);
            setLoading(false);
        }
        
    }
    useEffect(() => {
        getData()
    }, [])
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
                {loading ? <p>Loading...</p> :
                    <div className="home_items">
                        <ItemLists total={numberOfApplicants} count={numberOfApplicants} type="totalApplicants" />
                        <ItemLists total={numberOfApplicants} count={approvedApplicants} type="approvedApplicants" />
                        <ItemLists total={numberOfApplicants} count={pendingApplicants} type="pendingApplicants" />
                        <ItemLists total={numberOfApplicants} count={rejectedgApplicants} type="rejectedApplicants" />
                    </div>
                }
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