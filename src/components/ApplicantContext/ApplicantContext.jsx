import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ApplicantContext = createContext();

export const ApplicantContextProvider = ({ children }) => {
    const [numberOfApplicants, setNumberOfApplicants] = useState(null);
    const [pendingApplicants, setPendingApplicants] = useState(null);
    const [rejectedApplicants, setRejectedApplicants] = useState(null);
    const [approvedApplicants, setApprovedApplicants] = useState(null);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        const url = "http://127.0.0.1:8000/api/applicant_counts/";
        try {
            const response = await axios.get(url);
            const data = response.data;
            setNumberOfApplicants(data.totalApplicants);
            setPendingApplicants(data.pendingApplicants);
            setRejectedApplicants(data.rejectedApplicants);
            setApprovedApplicants(data.approvedApplicants);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching applicant counts:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <ApplicantContext.Provider value={{
            numberOfApplicants,
            pendingApplicants,
            rejectedApplicants,
            approvedApplicants,
            loading,
        }}>
            {children}
        </ApplicantContext.Provider>
    );
};

export const useApplicantData = () => {
    return useContext(ApplicantContext);
};
