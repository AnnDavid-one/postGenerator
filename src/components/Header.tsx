"use client";
import Image from "next/image";
import pansonee from "../assets/pansonee.jpg";

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <header className="w-full py-4 px-8 bg-white shadow-sm border-b border-gray-200 flex justify-between items-center">
      {/* <Image src="/pansonee.jpg" alt="Logo" className="w-10 h-10 mr-3" width={40} height={40} /> */}
      <Image
        src={pansonee}
        alt="Logo"
        className="w-20 h-20 rounded-full"
        width={50}
        height={50}
      />
      <nav className="flex gap-1">
        <button
          onClick={() => setView("twitter1")}
          className={`px-2 py-1 rounded-full text-sm font-semibold transition ${
            currentView === "twitter1"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Tw1
        </button>
        <button
          onClick={() => setView("twitter2")}
          className={`px-2 py-1 rounded-full text-sm font-semibold transition ${
            currentView === "twitter2"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Tw2
        </button>
        <button
          onClick={() => setView("terminal")}
          className={`px-2 py-1 rounded-full text-sm font-semibold transition ${
            currentView === "terminal"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Terminal
        </button>
        <button
          onClick={() => setView("AttendanceCalculator")}
          className={`px-2 py-1 rounded-full text-sm font-semibold transition ${
            currentView === "AttendanceCalculator"
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Attendance
        </button>
      </nav>
    </header>
  );
};

export default Header;
