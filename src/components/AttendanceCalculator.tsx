'use client';

import React, { useState } from 'react';

type Session = {
  id: string;
  day: string;
  period: 'Morning' | 'Afternoon';
  value: string; 
};

export default function AttendanceCalculator() {
  // Configuration
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  // State
  const [boysCount, setBoysCount] = useState('');
  const [girlsCount, setGirlsCount] = useState('');
  const [schoolOpenDays, setSchoolOpenDays] = useState('');
  const [sessions, setSessions] = useState<Session[]>(() => {
    return days.flatMap(day => [
      { id: `${day}-morning`, day, period: 'Morning', value: '' },
      { id: `${day}-afternoon`, day, period: 'Afternoon', value: '' }
    ]);
  });
  
  // Handlers
  const handleSessionChange = (id: string, value: string) => {
    // Only allow numbers and empty string
    const validatedValue = value === '' || /^\d+$/.test(value) ? value : '';
    
    setSessions(prev => 
      prev.map(session => 
        session.id === id ? { ...session, value: validatedValue } : session
      )
    );
  };
  
  // Calculations
  const totalStudents = (parseInt(boysCount) || 0) + (parseInt(girlsCount) || 0);
  const daysOpen = parseInt(schoolOpenDays) || 0;
  
  const morningSessions = sessions.filter(s => s.period === 'Morning');
  const afternoonSessions = sessions.filter(s => s.period === 'Afternoon');

  const totalPresentMorning = morningSessions.reduce((sum, session) => {
    return sum + (parseInt(session.value) || 0);
  }, 0);
  
  const totalPresentAfternoon = afternoonSessions.reduce((sum, session) => {
    return sum + (parseInt(session.value) || 0);
  }, 0);
  
  const totalPresent = totalPresentMorning + totalPresentAfternoon;

  const totalPossibleSessions = totalStudents * daysOpen ;
  const attendancePercentage = totalPossibleSessions > 0
    ? ((totalPresent * 100) / totalPossibleSessions).toFixed(1) : '0';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 md:max-w-2xl">
        
        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Weekly Attendance Calculator
        </h1>

        {/* Two-column Session Input Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Left Column - Morning Sessions */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-700 text-center border-b pb-2">Morning</h2>
            {morningSessions.map(session => (
              <div key={session.id} className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-gray-600 w-12">
                  {session.day.substring(0, 3)}
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  className="text-gray-900 w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  value={session.value}
                  onChange={(e) => handleSessionChange(session.id, e.target.value)}
                  placeholder="0"
                />
              </div>
            ))}
          </div>

          {/* Right Column - Afternoon Sessions */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-700 text-center border-b pb-2">Afternoon</h2>
            {afternoonSessions.map(session => (
              <div key={session.id} className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-gray-600 w-12">
                  {session.day.substring(0, 3)}
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  className="w-full px-3 text-gray-900 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  value={session.value}
                  onChange={(e) => handleSessionChange(session.id, e.target.value)}
                  placeholder="0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Class Info Inputs */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">No. boys</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={2}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
              value={boysCount}
              onChange={(e) => setBoysCount(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">No. girls</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={2}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
              value={girlsCount}
              onChange={(e) => setGirlsCount(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Days opened</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={2}
              className="text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
              value={schoolOpenDays}
              onChange={(e) => setSchoolOpenDays(e.target.value)}
            />
          </div>
        </div>

        {/* Attendance Outputs */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <p className="text-xs text-gray-500 font-medium">Morning Total</p>
            <p className="text-xl font-bold text-gray-800">{totalPresentMorning}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <p className="text-xs text-gray-500 font-medium">Afternoon Total</p>
            <p className="text-xl font-bold text-gray-800">{totalPresentAfternoon}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <p className="text-xs text-gray-500 font-medium">Combined Total</p>
            <p className="text-xl font-bold text-gray-800">{totalPresent}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center col-span-2 sm:col-span-1">
            <p className="text-xs text-blue-600 font-medium">Attendance Rate</p>
            <p className="text-xl font-bold text-blue-700">{attendancePercentage}%</p>
          </div>
        </div>

      </div>
    </div>
  );
}