'use client';

import React, { useState, FC } from 'react';
import { CircleUser } from 'lucide-react';
import AttendanceTable, { Student, AttendanceTableProps } from './AttendanceTable';

type Half = 'first' | 'second';
type Gender = 'boys' | 'girls';

// Helper function to generate unique IDs
const generateId = (half: Half, gender: Gender, index: number): string => {
  const prefix = `${half[0]}${gender[0]}`;
  return `${prefix}-${index}-${Date.now()}`;
};

const AttendanceTracker: FC = () => {
  // State for Boys - First Half
  const [boysFirstHalf, setBoysFirstHalf] = useState<Student[]>([
    { id: 'bf-1', name: 'Student 1', attendance: [0, 0, 0, 0, 0, 0] },
  ]);
  const [boysFirstHalfWeeks, setBoysFirstHalfWeeks] = useState<number>(6);
  const [NoOfTimesSchoolOpened, setNoOfTimesSchoolOpened] = useState(100);


  // State for Boys - Second Half
  const [boysSecondHalf, setBoysSecondHalf] = useState<Student[]>([
    { id: 'bs-1', name: 'Student 1', attendance: [0, 0, 0, 0, 0, 0, 0, 0] },
  ]);
  const [boysSecondHalfWeeks, setBoysSecondHalfWeeks] = useState<number>(8);

  // State for Girls - First Half
  const [girlsFirstHalf, setGirlsFirstHalf] = useState<Student[]>([
    { id: 'gf-1', name: 'Student 1', attendance: [0, 0, 0, 0, 0, 0] },
  ]);
  const [girlsFirstHalfWeeks, setGirlsFirstHalfWeeks] = useState<number>(6);

  // State for Girls - Second Half
  const [girlsSecondHalf, setGirlsSecondHalf] = useState<Student[]>([
    { id: 'gs-1', name: 'Student 1', attendance: [0, 0, 0, 0, 0, 0, 0, 0] },
  ]);
  const [girlsSecondHalfWeeks, setGirlsSecondHalfWeeks] = useState<number>(8);

  // Helper functions
  const addWeek = (half: Half, gender: Gender): void => {
    if (half === 'first') {
      if (gender === 'boys') {
        setBoysFirstHalfWeeks(boysFirstHalfWeeks + 1);
        setBoysFirstHalf(
          boysFirstHalf.map((student: Student) => ({
            ...student,
            attendance: [...student.attendance, 0],
          }))
        );
      } else {
        setGirlsFirstHalfWeeks(girlsFirstHalfWeeks + 1);
        setGirlsFirstHalf(
          girlsFirstHalf.map((student: Student) => ({
            ...student,
            attendance: [...student.attendance, 0],
          }))
        );
      }
    } else {
      if (gender === 'boys') {
        setBoysSecondHalfWeeks(boysSecondHalfWeeks + 1);
        setBoysSecondHalf(
          boysSecondHalf.map((student: Student) => ({
            ...student,
            attendance: [...student.attendance, 0],
          }))
        );
      } else {
        setGirlsSecondHalfWeeks(girlsSecondHalfWeeks + 1);
        setGirlsSecondHalf(
          girlsSecondHalf.map((student: Student) => ({
            ...student,
            attendance: [...student.attendance, 0],
          }))
        );
      }
    }
  };

  const addStudent = (half: Half, gender: Gender): void => {
    const getWeeksCount = (): number => {
      if (half === 'first') {
        return gender === 'boys' ? boysFirstHalfWeeks : girlsFirstHalfWeeks;
      }
      return gender === 'boys' ? boysSecondHalfWeeks : girlsSecondHalfWeeks;
    };

    const getStudentCount = (): number => {
      if (half === 'first') {
        return gender === 'boys' ? boysFirstHalf.length : girlsFirstHalf.length;
      }
      return gender === 'boys' ? boysSecondHalf.length : girlsSecondHalf.length;
    };

    const newStudent: Student = {
      id: generateId(half, gender, getStudentCount()),
      name: `Student ${getStudentCount() + 1}`,
      attendance: Array(getWeeksCount()).fill(0),
    };

    if (half === 'first') {
      if (gender === 'boys') {
        setBoysFirstHalf([...boysFirstHalf, newStudent]);
      } else {
        setGirlsFirstHalf([...girlsFirstHalf, newStudent]);
      }
    } else {
      if (gender === 'boys') {
        setBoysSecondHalf([...boysSecondHalf, newStudent]);
      } else {
        setGirlsSecondHalf([...girlsSecondHalf, newStudent]);
      }
    }
  };

  const removeStudent = (index: number, half: Half, gender: Gender): void => {
    if (half === 'first') {
      if (gender === 'boys') {
        setBoysFirstHalf(boysFirstHalf.filter((_, i: number) => i !== index));
      } else {
        setGirlsFirstHalf(girlsFirstHalf.filter((_, i: number) => i !== index));
      }
    } else {
      if (gender === 'boys') {
        setBoysSecondHalf(boysSecondHalf.filter((_, i: number) => i !== index));
      } else {
        setGirlsSecondHalf(girlsSecondHalf.filter((_, i: number) => i !== index));
      }
    }
  };

  const updateAttendance = (
    index: number,
    weekIndex: number,
    value: string,
    half: Half,
    gender: Gender
  ): void => {
    const numValue: number = Math.max(0, parseInt(value) || 0);

    if (half === 'first') {
      if (gender === 'boys') {
        const updated: Student[] = [...boysFirstHalf];
        updated[index].attendance[weekIndex] = numValue;
        setBoysFirstHalf(updated);
      } else {
        const updated: Student[] = [...girlsFirstHalf];
        updated[index].attendance[weekIndex] = numValue;
        setGirlsFirstHalf(updated);
      }
    } else {
      if (gender === 'boys') {
        const updated: Student[] = [...boysSecondHalf];
        updated[index].attendance[weekIndex] = numValue;
        setBoysSecondHalf(updated);
      } else {
        const updated: Student[] = [...girlsSecondHalf];
        updated[index].attendance[weekIndex] = numValue;
        setGirlsSecondHalf(updated);
      }
    }
  };

  const updateName = (index: number, value: string, half: Half, gender: Gender): void => {
    if (half === 'first') {
      if (gender === 'boys') {
        const updated: Student[] = [...boysFirstHalf];
        updated[index].name = value;
        setBoysFirstHalf(updated);
      } else {
        const updated: Student[] = [...girlsFirstHalf];
        updated[index].name = value;
        setGirlsFirstHalf(updated);
      }
    } else {
      if (gender === 'boys') {
        const updated: Student[] = [...boysSecondHalf];
        updated[index].name = value;
        setBoysSecondHalf(updated);
      } else {
        const updated: Student[] = [...girlsSecondHalf];
        updated[index].name = value;
        setGirlsSecondHalf(updated);
      }
    }
  };

  const calculateRowTotal = (attendance: number[]): number =>
    attendance.reduce((sum: number, val: number) => sum + val, 0);

  const calculateColumnTotal = (data: Student[]): number[] => {
    const totals: number[] = [];
    if (data.length === 0) return totals;
    const numWeeks: number = data[0].attendance.length;
    for (let i = 0; i < numWeeks; i++) {
      totals.push(data.reduce((sum: number, student: Student) => sum + student.attendance[i], 0));
    }
    return totals;
  };

  // Calculate grand totals
  const boysTotalFirstHalf: number = boysFirstHalf.reduce(
    (sum: number, s: Student) => sum + calculateRowTotal(s.attendance),
    0
  );
  const boysTotalSecondHalf: number = boysSecondHalf.reduce(
    (sum: number, s: Student) => sum + calculateRowTotal(s.attendance),
    0
  );
  const girlsTotalFirstHalf: number = girlsFirstHalf.reduce(
    (sum: number, s: Student) => sum + calculateRowTotal(s.attendance),
    0
  );
  const girlsTotalSecondHalf: number = girlsSecondHalf.reduce(
    (sum: number, s: Student) => sum + calculateRowTotal(s.attendance),
    0
  );

  const boysGrandTotal: number = boysTotalFirstHalf + boysTotalSecondHalf;
  const girlsGrandTotal: number = girlsTotalFirstHalf + girlsTotalSecondHalf;
  const overallGrandTotal: number = boysGrandTotal + girlsGrandTotal;
  const averageAttendance: number = NoOfTimesSchoolOpened > 0 ? overallGrandTotal / NoOfTimesSchoolOpened : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">School Attendance Tracker</h1>
        <p className="text-gray-900 mb-6">End of Session Attendance Calculation By David Aka Hard_Code</p>
             <input
                            type="text"
                            value={NoOfTimesSchoolOpened}
                            onChange={(e) =>
                              setNoOfTimesSchoolOpened(Number(e.target.value))
                            }
                            placeholder={`No Of Times School Opened`}
                            className="w-1/8   px-2 py-1 border border-gray-300 rounded bg-amber-100 my-12"
                          />
        {/* BOYS SECTION */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 p-3 bg-blue-100 rounded flex flex-row">
            <CircleUser size={32} className="text-blue-500" />
            BOYS
          </h2>

          <AttendanceTable
            title="First Half (Boys)"
            data={boysFirstHalf}
            weeks={boysFirstHalfWeeks}
            half="first"
            gender="boys"
            onAddWeek={() => addWeek('first', 'boys')}
            onAddStudent={() => addStudent('first', 'boys')}
            onUpdateAttendance={updateAttendance}
            onUpdateName={updateName}
            onRemoveStudent={removeStudent}
            calculateRowTotal={calculateRowTotal}
            calculateColumnTotal={calculateColumnTotal}
          />

          <AttendanceTable
            title="Second Half (Boys)"
            data={boysSecondHalf}
            weeks={boysSecondHalfWeeks}
            half="second"
            gender="boys"
            onAddWeek={() => addWeek('second', 'boys')}
            onAddStudent={() => addStudent('second', 'boys')}
            onUpdateAttendance={updateAttendance}
            onUpdateName={updateName}
            onRemoveStudent={removeStudent}
            calculateRowTotal={calculateRowTotal}
            calculateColumnTotal={calculateColumnTotal}
          />
        </div>

        {/* GIRLS SECTION */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-pink-700 mb-4 p-3 bg-pink-100 rounded flex flex-row">
            <CircleUser size={32} className="text-pink-500" /> GIRLS
          </h2>

          <AttendanceTable
            title="First Half (Girls)"
            data={girlsFirstHalf}
            weeks={girlsFirstHalfWeeks}
            half="first"
            gender="girls"
            onAddWeek={() => addWeek('first', 'girls')}
            onAddStudent={() => addStudent('first', 'girls')}
            onUpdateAttendance={updateAttendance}
            onUpdateName={updateName}
            onRemoveStudent={removeStudent}
            calculateRowTotal={calculateRowTotal}
            calculateColumnTotal={calculateColumnTotal}
          />

          <AttendanceTable
            title="Second Half (Girls)"
            data={girlsSecondHalf}
            weeks={girlsSecondHalfWeeks}
            half="second"
            gender="girls"
            onAddWeek={() => addWeek('second', 'girls')}
            onAddStudent={() => addStudent('second', 'girls')}
            onUpdateAttendance={updateAttendance}
            onUpdateName={updateName}
            onRemoveStudent={removeStudent}
            calculateRowTotal={calculateRowTotal}
            calculateColumnTotal={calculateColumnTotal}
          />
        </div>

        {/* SUMMARY SECTION */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-gray-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Summary</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-300">
              <p className="text-sm text-gray-900">Boys - First Half</p>
              <p className="text-3xl font-bold text-blue-700">{boysTotalFirstHalf}</p>
            </div>

            <div className="bg-blue-100 p-4 rounded-lg border-2 border-blue-400">
              <p className="text-sm text-gray-900">Boys - Second Half</p>
              <p className="text-3xl font-bold text-blue-800">{boysTotalSecondHalf}</p>
            </div>

            <div className="bg-pink-50 p-4 rounded-lg border-2 border-pink-300">
              <p className="text-sm text-gray-900">Girls - First Half</p>
              <p className="text-3xl font-bold text-pink-700">{girlsTotalFirstHalf}</p>
            </div>

            <div className="bg-pink-100 p-4 rounded-lg border-2 border-pink-400">
              <p className="text-sm text-gray-900">Girls - Second Half</p>
              <p className="text-3xl font-bold text-pink-800">{girlsTotalSecondHalf}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-200 p-4 rounded-lg border-2 border-blue-500">
              <p className="text-sm font-semibold text-gray-700">Total Boys (Both Halves)</p>
              <p className="text-4xl font-bold text-blue-900">{boysGrandTotal}</p>
            </div>

            <div className="bg-pink-200 p-4 rounded-lg border-2 border-pink-500">
              <p className="text-sm font-semibold text-gray-700">Total Girls (Both Halves)</p>
              <p className="text-4xl font-bold text-pink-900">{girlsGrandTotal}</p>
            </div>

            <div className="bg-gradient-to-r from-blue-300 to-pink-300 p-4 rounded-lg border-2 border-purple-500">
              <p className="text-sm font-semibold text-gray-800">Grand Total (All Students)</p>
              <p className="text-4xl font-bold text-purple-900">{overallGrandTotal}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-300 to-pink-300 p-4 rounded-lg border-2 border-purple-500">
              <p className="text-sm font-semibold text-gray-800">Average Attendance</p>
              <p className="text-4xl font-bold text-purple-900">{averageAttendance.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracker;