"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface UserData {
  name: string;
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

  // ✅ Load user from localStorage on client-side only
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
