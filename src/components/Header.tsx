"use client";
import React, { useState } from "react";
import Image from "next/image";
import pansonee from "../assets/pansonee.jpg";

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (view: string) => {
    setView(view);
    setIsOpen(false); // Close mobile drawer after selecting a view
  };

  const navItems = [
    { id: "twitter1", label: "Tw1" },
    { id: "twitter2", label: "Tw2" },
    { id: "terminal", label: "Terminal" },
    { id: "AttendanceCalculator", label: "Attendance" },
    { id: "Attendancetracker", label: "Atrkr" },
  ];

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      {/* Top Bar Layout */}
      <div className="w-full py-3 px-4 sm:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src={pansonee}
            alt="Logo"
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
            width={64}
            height={64}
          />
        </div>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className="hidden sm:flex gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition whitespace-nowrap ${
                currentView === item.id
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Hamburger Button (Hidden on Desktop) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              // "X" Close Icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              // Hamburger Icon
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer Navigation (Toggled by Hamburger State) */}
      <div
        className={`sm:hidden transition-all duration-300 ease-in-out overflow-hidden border-t border-gray-100 bg-gray-50 ${
          isOpen ? "max-h-60 opacity-100 py-3" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-4 gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm font-semibold transition ${
                currentView === item.id
                  ? "bg-blue-500 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;