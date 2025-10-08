"use client";
import { useState } from "react";
import {
    Menu,
    X,
    Home,
    BookOpen,
    FileText,
    Bell,
    Phone,
    ChevronDown,
} from "lucide-react";
import Image from "next/image";

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState("EN");

    return (
        <header className="w-full border-b border-gray-200">
            {/* ---------- TOP BAR ---------- */}
            <div className="w-full bg-[#1A7EBD] text-sm">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-2">
                    {/* Search bar */}
                    <div className="w-1/2 max-w-md">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full border border-gray-300 text-white rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </div>

                    {/* Language dropdown */}
                    <select
                        value={selectedLang}
                        onChange={(e) => setSelectedLang(e.target.value)}
                        className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none text-white"
                    >
                        <option value="EN" className="text-black">ENGLISH</option>
                        <option value="HI" className="text-black">HINDI</option>
                    </select>
                </div>
            </div>

            {/* ---------- MAIN NAV BAR ---------- */}
            <div className="w-full bg-white">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <Image
                            src="/assets/img/logo.png"
                            alt="Logo"
                            width={250}
                            height={100}
                            className=""
                        />

                    </div>

                    {/* Desktop Nav Links */}
                    <nav className="hidden md:flex space-x-6 font-medium">
                        <a href="#" className="hover:text-blue-600">
                            <Home size={22} className="text-center"/>
                            Home
                        </a>
                        <a href="#" className="hover:text-blue-600">
                            <BookOpen size={22} className="text-center"/>
                            Answer Key
                        </a>
                        <a href="#" className="hover:text-blue-600">
                            <FileText size={22} className="text-center"/>
                            Results
                        </a>
                        <a href="#" className="hover:text-blue-600">
                            <Bell size={22} className="text-center"/>
                            Notifications
                        </a>
                        <a href="#" className="hover:text-blue-600">
                            <Phone size={22} className="text-center"/>
                            Contact
                        </a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden focus:outline-none"
                    >
                        {menuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* ---------- DROPDOWN MENU SECTION (DESKTOP ONLY) ---------- */}
                <div className="hidden md:flex justify-center bg-gray-50 border-t border-gray-200">
                    <div className="flex space-x-8 py-2 text-sm font-medium">
                        {["Exams", "Courses", "Study Material", "Updates", "More"].map(
                            (item) => (
                                <div key={item} className="group relative cursor-pointer">
                                    <span className="flex items-center space-x-1 hover:text-blue-600">
                                        <span>{item}</span>
                                        <ChevronDown size={16} />
                                    </span>
                                    {/* Dropdown content */}
                                    <div className="absolute left-0 top-full hidden group-hover:block bg-white shadow-lg border rounded-md mt-1 min-w-[150px]">
                                        <ul className="py-2">
                                            <li className="px-4 py-1 hover:bg-gray-100">Option 1</li>
                                            <li className="px-4 py-1 hover:bg-gray-100">Option 2</li>
                                            <li className="px-4 py-1 hover:bg-gray-100">Option 3</li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* ---------- MOBILE SIDEBAR MENU ---------- */}
            {menuOpen && (
                <div className="md:hidden fixed inset-0 bg-black bg-opacity-40 z-50">
                    <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-5 space-y-5">
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="absolute top-4 right-4 text-gray-700"
                        >
                            <X size={24} />
                        </button>

                        <div className="mt-10 space-y-4 text-lg">
                            <a href="#" className="block hover:text-blue-600">
                                Home
                            </a>
                            <a href="#" className="block hover:text-blue-600">
                                Notice
                            </a>

                            <a href="#" className="block hover:text-blue-600">
                                Results
                            </a>
                            <a href="#" className="block hover:text-blue-600">
                                Notifications
                            </a>
                            <a href="#" className="block hover:text-blue-600">
                                Contact
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
