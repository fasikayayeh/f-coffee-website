import { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            setUser(JSON.parse(loggedInUser));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, {
                email,
                password,
            });
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
            return { success: true };
        } catch (err) {
            console.error("Login request failed:", err.response || err.message || err);
            const message = err.response?.data?.message || err.response?.data || err.message || "Login failed";
            return { success: false, message };
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await axios.post(`${API_URL}/api/auth/register`, {
                name,
                email,
                password,
            });
            // Auto-login: set user with returned data
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            return { success: true };
        } catch (err) {
            console.error("Registration request failed:", err.response || err.message || err);
            const message = err.response?.data?.message || err.response?.data || err.message || "Registration failed";
            return { success: false, message };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
