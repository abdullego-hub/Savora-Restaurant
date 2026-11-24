import { createContext, useContext, useState } from "react";
import { getFromStorage, saveToStorage, removeFromStorage } from "../utils/storage";

const AuthContext = createContext(null);

// Local Storage keys used by this app:
//   savora_users   -> array of registered accounts { name, email, phone, password }
//   savora_session -> the email of the currently logged-in user
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const email = getFromStorage("savora_session", null);
        if (!email) return null;
        const users = getFromStorage("savora_users", []);
        return users.find((u) => u.email === email) || null;
    });

    const register = ({ name, email, phone, password }) => {
        const users = getFromStorage("savora_users", []);

        const emailTaken = users.some(
            (u) => u.email.toLowerCase() === email.toLowerCase()
        );
        if (emailTaken) {
            return { ok: false, message: "An account with this email already exists." };
        }

        const newUser = { name, email, phone, password };
        saveToStorage("savora_users", [...users, newUser]);
        return { ok: true, message: "Account created successfully! You can now log in." };
    };

    const login = (email, password) => {
        const users = getFromStorage("savora_users", []);
        const found = users.find(
            (u) => u.email.toLowerCase() === email.toLowerCase()
        );

        if (!found) return { ok: false, message: "No account found with this email." };
        if (found.password !== password)
            return { ok: false, message: "Incorrect password. Please try again." };

        saveToStorage("savora_session", found.email);
        setUser(found);
        return { ok: true };
    };

    const logout = () => {
        removeFromStorage("savora_session"); // session only — account stays saved
        setUser(null);
    };

    const updateProfile = (updates) => {
        const users = getFromStorage("savora_users", []);
        const updatedUsers = users.map((u) =>
            u.email === user.email ? { ...u, ...updates } : u
        );
        saveToStorage("savora_users", updatedUsers);
        setUser({ ...user, ...updates });
    };

    return (
        <AuthContext.Provider
            value={{ user, register, login, logout, updateProfile }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}