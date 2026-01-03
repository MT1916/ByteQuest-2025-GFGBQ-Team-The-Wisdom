import React, { createContext, useState, useContext, useEffect } from 'react';

// --- MOCK AUTHORIZATION CONFIG (Mirroring Backend) ---
const MOCK_ROLES = {
    "0xYourDonorAddressHere": "DONOR",
    "0xYourNGOAddressHere": "NGO",
    "0xYourValidatorAddressHere": "VALIDATOR",
    // Dev shortcuts
    "donor": "DONOR",
    "ngo": "NGO",
    "validator": "VALIDATOR"
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // { address: string, role: string }
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check localStorage for persisted session
        const storedUser = localStorage.getItem('zakaat_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (address) => {
        // In real app: Validate signature here
        const role = MOCK_ROLES[address] || MOCK_ROLES[address.toLowerCase()] || "GUEST";

        const userData = { address, role };
        setUser(userData);
        localStorage.setItem('zakaat_user', JSON.stringify(userData));
        console.log("Logged In:", userData);
        return role;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('zakaat_user');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
