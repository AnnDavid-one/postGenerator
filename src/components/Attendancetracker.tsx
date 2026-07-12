'use client';

import React, { useState, FC, ChangeEvent } from 'react';
import { CircleUser, Plus, Trash2 } from 'lucide-react';

// Type Definitions
interface Student {
  name: string;
  attendance: number[];
}

interface AttendanceTableProps {
  title: string;
  data: Student[];
  weeks: number;
  half: 'first' | 'second';
  gender: 'boys' | 'girls';
  onAddWeek: () => void;
  onAddStudent: () => void;
}

type Half = 'first' | 'second';
type Gender = 'boys' | 'girls';

const AttendanceTracker: FC = () => {
  // State for Boys - First Half
  const [boysFirstHalf, setBoysFirstHalf] = useState<Student[]>([
    { name: 'Student 1', attendance: [0, 0, 0, 0, 0, 0] },
  ]);
  const [boysFirstHalfWeeks, setBoysFirstHalfWeeks] = useState<number>(6);

  // State for Boys - Second Half
  const [boysSecondHalf, setBoysSecondHalf] = useState<Student[]>([
    { name: 'Student 1', attendance: [0, 0, 0, 0, 0, 0, 0, 0] },
  ]);
  const [boysSecondHalfWeeks, setBoysSecondHalfWeeks] = useState<number>(8);

  // State for Girls - First Half
  const [girlsFirstHalf, setGirlsFirstHalf] = useState<Student[]>([
    { name: 'Student 1', attendance: [0, 0, 0, 0, 0, 0] },
  ]);
  const [girlsFirstHalfWeeks, setGirlsFirstHalfWeeks] = useState<number>(6);

  // State for Girls - Second Half
  const [girlsSecondHalf, setGirlsSecondHalf] = useState<Student[]>([
    { name: 'Student 1', attendance: [0, 0, 0, 0, 0, 0, 0, 0] },
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

  const AttendanceTable: FC<AttendanceTableProps> = ({
    title,
    data,
    weeks,
    half,
    gender,
    onAddWeek,
    onAddStudent,
  }) => (
    <div className="mb-8 p-4 border border-gray-300 rounded-lg bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <div className="flex gap-2">
          <button
            onClick={onAddWeek}
            className="flex items-center gap-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            <Plus size={16} /> Add Week
          </button>
          <button
            onClick={onAddStudent}
            className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
          >
            <Plus size={16} /> Add Student
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 p-2 text-left font-semibold">S/N</th>
              <th className="border border-gray-400 p-2 text-left font-semibold">Student Name</th>
              {Array.from({ length: weeks }).map((_, i: number) => (
                <th key={i} className="border border-gray-400 p-2 text-center font-semibold text-sm">
                  <div className="text-xs font-bold text-gray-900">W{i + 1}</div>
                  <div className="text-xs text-gray-900">Week {i + 1}</div>
                </th>
              ))}
              <th className="border border-gray-400 p-2 text-center font-semibold bg-yellow-100">Total</th>
              <th className="border border-gray-400 p-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student: Student, index: number) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-400 p-2 text-center font-bold text-gray-700 bg-gray-100 w-12">
                  {index + 1}
                </td>
                <td className="border border-gray-400 p-2">
                  <input
                    type="text"
                    value={student.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      updateName(index, e.target.value, half, gender)
                    }
                    placeholder={`Student ${index + 1}`}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  />
                </td>
                {student.attendance.map((attendance: number, weekIndex: number) => (
                  <td key={weekIndex} className="border border-gray-400 p-1 text-center relative group">
                    <input
                      type="number"
                      min="0"
                      value={attendance === 0 ? '' : attendance}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        updateAttendance(index, weekIndex, e.target.value || '0', half, gender)
                      }
                      placeholder=""
                      className="w-16 px-1 py-1 border border-gray-300 rounded text-center font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
                      title={`Student ${index + 1} - Week ${weekIndex + 1}`}
                    />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                      S{index + 1} × W{weekIndex + 1}
                    </div>
                  </td>
                ))}
                <td className="border border-gray-400 p-2 text-center font-bold text-lg bg-yellow-100">
                  {calculateRowTotal(student.attendance)}
                </td>
                <td className="border border-gray-400 p-2 text-center">
                  <button
                    onClick={() => removeStudent(index, half, gender)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                    title={`Delete Student ${index + 1}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            <tr className="bg-blue-100 font-semibold">
              <td className="border border-gray-400 p-2 text-center">-</td>
              <td className="border border-gray-400 p-2">Weekly Total</td>
              {calculateColumnTotal(data).map((total: number, i: number) => (
                <td key={i} className="border border-gray-400 p-2 text-center font-bold text-blue-700">
                  {total}
                </td>
              ))}
              <td className="border border-gray-400 p-2 text-center font-bold">
                {data.reduce((sum: number, student: Student) => sum + calculateRowTotal(student.attendance), 0)}
              </td>
              <td className="border border-gray-400 p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">School Attendance Tracker</h1>
        <p className="text-gray-900 mb-6">End of Session Attendance Calculation By David Aka Hard_Code</p>

        {/* BOYS SECTION */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 p-3 bg-blue-100 rounded flex flex-row"><CircleUser size={32} className="text-blue-500" />BOYS</h2>

          <AttendanceTable
            title="First Half (Boys)"
            data={boysFirstHalf}
            weeks={boysFirstHalfWeeks}
            half="first"
            gender="boys"
            onAddWeek={() => addWeek('first', 'boys')}
            onAddStudent={() => addStudent('first', 'boys')}
          />

          <AttendanceTable
            title="Second Half (Boys)"
            data={boysSecondHalf}
            weeks={boysSecondHalfWeeks}
            half="second"
            gender="boys"
            onAddWeek={() => addWeek('second', 'boys')}
            onAddStudent={() => addStudent('second', 'boys')}
          />
        </div>

        {/* GIRLS SECTION */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-pink-700 mb-4 p-3 bg-pink-100 rounded flex flex-row"><CircleUser size={32} className="text-pink-500" /> GIRLS</h2>

          <AttendanceTable
            title="First Half (Girls)"
            data={girlsFirstHalf}
            weeks={girlsFirstHalfWeeks}
            half="first"
            gender="girls"
            onAddWeek={() => addWeek('first', 'girls')}
            onAddStudent={() => addStudent('first', 'girls')}
          />

          <AttendanceTable
            title="Second Half (Girls)"
            data={girlsSecondHalf}
            weeks={girlsSecondHalfWeeks}
            half="second"
            gender="girls"
            onAddWeek={() => addWeek('second', 'girls')}
            onAddStudent={() => addStudent('second', 'girls')}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracker;