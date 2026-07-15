import React, { FC, ChangeEvent } from 'react';
import { Plus, Trash2 } from 'lucide-react';

// Type Definitions
export interface Student {
  id: string;
  name: string;
  attendance: number[];
}

export interface AttendanceTableProps {
  title: string;
  data: Student[];
  weeks: number;
  half: 'first' | 'second';
  gender: 'boys' | 'girls';
  onAddWeek: () => void;
  onAddStudent: () => void;
  onUpdateAttendance: (index: number, weekIndex: number, value: string, half: 'first' | 'second', gender: 'boys' | 'girls') => void;
  onUpdateName: (index: number, value: string, half: 'first' | 'second', gender: 'boys' | 'girls') => void;
  onRemoveStudent: (index: number, half: 'first' | 'second', gender: 'boys' | 'girls') => void;
  calculateRowTotal: (attendance: number[]) => number;
  calculateColumnTotal: (data: Student[]) => number[];
}

const AttendanceTable: FC<AttendanceTableProps> = ({
  title,
  data,
  weeks,
  half,
  gender,
  onAddWeek,
  onAddStudent,
  onUpdateAttendance,
  onUpdateName,
  onRemoveStudent,
  calculateRowTotal,
  calculateColumnTotal,
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
            <tr key={student.id} className="hover:bg-gray-100">
              <td className="border border-gray-400 p-2 text-center font-bold text-gray-700 bg-gray-100 w-12">
                {index + 1}
              </td>
              <td className="border border-gray-400 p-2">
                <input
                  type="text"
                  value={student.name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onUpdateName(index, e.target.value, half, gender)
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
                      onUpdateAttendance(index, weekIndex, e.target.value || '0', half, gender)
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
                  onClick={() => onRemoveStudent(index, half, gender)}
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

export default AttendanceTable;
