import { createContext, useState, useEffect } from "react";
import axios from "axios";

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
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });
            setUser(res.data);
            localStorage.setItem("user", JSON.stringify(res.data));
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data || "Login failed" };
        }
    };

    const register = async (name, email, password) => {
        try {
            await axios.post("http://localhost:5000/api/auth/register", {
                name,
                email,
                password,
            });
            return { success: true };
        } catch (err) {
            return { success: false, message: err.response?.data || "Registration failed" };
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
