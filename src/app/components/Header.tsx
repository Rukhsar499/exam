"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { UserCircle } from "lucide-react"; // profile icon from lucide-react

interface UserData {
  name: string;
}

export default function Header() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    // 🔹 Fetch user data from API
    const fetchUser = async () => {
      try {
        const res = await fetch("");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="flex  items-center justify-between px-6 py-3 bg-white shadow-md">
      {/* Left: Logo */}
      <div className="container mx-auto">
        <div className="flex justify-between">
      <div className="flex items-center space-x-2">
        <Image
          src="/assets/img/logo.png" 
          alt="Logo"
          width={240}
          height={40}
        />
       
      </div>

      {/* Right: Profile */}
      <div className="flex items-center space-x-3">
        <UserCircle className="w-6 h-6 text-gray-700" />
        <span className="text-gray-800 font-medium">
          {user ? user.name : "Rukhsar"}
        </span>
      </div>
      </div>
      </div>
    </header>
  );
}
