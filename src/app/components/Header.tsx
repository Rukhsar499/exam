"use client";
import { useUser } from "../context/UserContext";
import Image from "next/image";
import { UserCircle } from "lucide-react";

export default function Header() {
  const { user } = useUser();

  return (
    <header className="fixed w-full flex items-center justify-between px-6 py-3 bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Image
          src="/assets/img/logo.png"
          alt="Logo"
          width={240}
          height={40}
          className="md:w-[260px] w-[170px]"
        />

        {/* Profile */}
        <div className="flex items-center space-x-3">
          <UserCircle className="w-6 h-6 text-gray-700" />
          <span className="text-gray-800 font-medium"> {user ? user.username : ""} </span>
        </div>
      </div>
    </header>
  );
}
