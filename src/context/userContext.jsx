// src/context/UserContext.jsx

import { createContext, useState, useEffect } from "react";
import api from "../config/axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadUser = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {

                const response = await api.get(
                    "/api/user/me",
                    {
                        headers: {
                            token
                        }
                    }
                );

                if (response.data.success) {
                    setUser(response.data.user);
                }

            } catch (error) {
                console.log(error);
            }

            setLoading(false);
        };

        loadUser();

    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                loading
            }}
        >
            {children}
        </UserContext.Provider>
    );
};