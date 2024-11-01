import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import api from '../api';
interface AuthContextType {
    token: string | null;
    setToken: (token: string) => void;
    removeToken: () => void;
    setRefreshToken: (token: string) => void;
    refreshAccessToken: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setTokenState] = useState<string | null>(localStorage.getItem('token'));
    const [refreshTokenState, setRefreshTokenState] = useState<string | null>(localStorage.getItem('refreshToken'));

    const setToken = (newToken: string) => {
        setTokenState(newToken);
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
        }
    };

    const setRefreshToken = (newToken: string) => {
        setRefreshTokenState(newToken);
        if (newToken) {
            localStorage.setItem('refreshToken', newToken);
        } else {
            localStorage.removeItem('refreshToken');
        }
    };

    const removeToken = () => {
        setTokenState(null);
        setRefreshTokenState(null);
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
    };

    const refreshAccessToken = async () => {
        if (refreshTokenState) {
            try {
                const response = await api.post('/token/refresh/', { refresh: refreshTokenState });
                setToken(response.data.access);
                setRefreshToken(response.data.refresh); // Optionally update the refresh token
            } catch (error) {
                console.error('Error refreshing token:', error);
                removeToken();
            }
        }
    };

    const logout = () => {
        removeToken();
        // Optionally redirect to the homepage or login page after logging out
        // navigate('/login'); // Uncomment if using react-router and you want redirection
    };

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        if (storedToken) {
            setTokenState(storedToken);
        }
        if (storedRefreshToken) {
            setRefreshTokenState(storedRefreshToken);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken, removeToken, setRefreshToken, refreshAccessToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
