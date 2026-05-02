"use client";

interface HeaderProps {
  currentView: string;
  setView: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <header className="w-full py-4 px-8 bg-white shadow-sm border-b border-gray-200 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">PostGen v2</h1>
      <nav className="flex gap-4">
        <button
          onClick={() => setView("twitter1")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            currentView === "twitter1" 
              ? "bg-blue-500 text-white" 
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Tw1
        </button>
        <button
          onClick={() => setView("twitter2")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            currentView === "twitter2" 
              ? "bg-blue-500 text-white" 
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Tw2
        </button>
        <button
          onClick={() => setView("terminal")}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
            currentView === "terminal" 
              ? "bg-blue-500 text-white" 
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Terminal
        </button>
      </nav>
    </header>
  );
};

export default Header;