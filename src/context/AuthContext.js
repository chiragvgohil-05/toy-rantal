// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import { getProfile } from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        async function loadUser() {
            try {
                const res = await getProfile(); // GET /api/me
                if (res?.data?.user) setUser(res.data.user);
            } catch (err) {
                setUser(null);
                localStorage.removeItem("token");
            } finally {
                setLoading(false);
            }
        }
        loadUser();
    }, []);

    const login = (userData, token) => {
        localStorage.setItem("token", token);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    const isLoggedIn = !!user;
    const isAdmin = user?.role === "admin";

    return (
        <AuthContext.Provider value={{ user, setUser, isLoggedIn, isAdmin, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
