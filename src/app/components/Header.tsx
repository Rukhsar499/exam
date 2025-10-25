"use client";
import { useUser } from "../context/UserContext";
import Image from "next/image";
import { UserCircle, LogOut, User } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Header() {
  const { user, logout } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed w-full flex items-center justify-between px-6 py-3 bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Image src="/assets/img/logo.png" alt="Logo" width={240} height={40} className="md:w-[260px] w-[170px]" />

        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setIsDropdownOpen((prev) => !prev)}
          >
            <UserCircle className="w-6 h-6 text-gray-700" />
            <span className="text-gray-800 font-medium">{user ? user.username : ""}</span>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50">
              <button
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                onClick={() => (window.location.href = "/profile")}
              >
                <User className="w-4 h-4 mr-2" /> My Profile
              </button>
              <button
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                onClick={() => {
                  logout(); // context logout
                  window.location.reload(); // refresh page
                }}
              >
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
