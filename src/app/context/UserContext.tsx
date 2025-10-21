"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// ✅ Exactly matches your API structure
interface UserData {
username: string;
user_emailid?: string;
user_mobileno?: string;
userid?: number;
[key: string]: unknown;
}

interface UserContextType {
user: UserData | null;
setUser: (user: UserData | null) => void;
}

const UserContext = createContext<UserContextType>({
user: null,
setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
const [user, setUser] = useState<UserData | null>(null);
const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
const storedUser = localStorage.getItem("user");
if (storedUser) {
try {
setUser(JSON.parse(storedUser));
} catch (err) {
console.error("Invalid user data in localStorage:", err);
localStorage.removeItem("user");
}
}
setIsLoaded(true);
}, []);

if (!isLoaded) return null;

return (
<UserContext.Provider value={{ user, setUser }}>
{children}
</UserContext.Provider>
);
};

export const useUser = () => useContext(UserContext);
