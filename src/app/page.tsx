"use client";
import AttendanceCalculator from '@/components/AttendanceCalculator';
import Header from '@/components/Header';
import MacTerminalGenerator from '@/components/MacTerminalGenerator';
import TwitterPostGenerator from '@/components/TwitterPostGenerator';
import dynamic from 'next/dynamic';
import Attendancetracker from '@/components/Attendancetracker';
import { useState } from 'react';

// const DynamicComponent = dynamic(() => import('../components/HeavyComponent'))
const Twitter2Generator = dynamic(() => import('../components/Twitter2generator'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  const [activeView, setActiveView] = useState("twitter1");
  
  // Helper function using a switch statement
  const renderComponent = () => {
    switch (activeView) {
      case "twitter1":
        return <TwitterPostGenerator />;
      case "twitter2":
        return <Twitter2Generator />;
      case "terminal":
        return <MacTerminalGenerator />;
      case "AttendanceCalculator":
        return <AttendanceCalculator />;
      case "Attendancetracker":
        return <Attendancetracker />;
      case "linkedin":
        return <div className="p-10 text-center">LinkedIn Tool Coming Soon</div>;
      default:
        return <TwitterPostGenerator />;
    }
  };

  return (
   <main >
      <Header currentView={activeView} setView={setActiveView} />

        {/* Call the switch function here */}
        {renderComponent()}
    </main>
  // <main>
  //   <MacTerminalGenerator />
  // </main>
  );
}