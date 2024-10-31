import React, { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "../api"; 

// Create a Context
const UserContext = createContext(null);

// Create a Provider Component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await getProfile();
                setUser(response.data[0]); 
            } catch (error) {
                console.error("Error fetching user profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};

// Create a custom hook to use the UserContext
export const useUser = () => {
    return useContext(UserContext);
};
