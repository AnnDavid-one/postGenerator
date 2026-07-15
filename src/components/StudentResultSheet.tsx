import React from 'react';

export interface StudentInfo {
  portalId: string;
  admissionNumber: string;
  name: string;
  sex: string;
  class: string;
  schoolOpened: number;
  attendance: number;
}

export interface SchoolInfo {
  name: string;
  address: string;
  logo: string;
  term: string;
  academicSession: string;
  reportType: string;
}

interface StudentResultSheetProps {
  schoolInfo: SchoolInfo;
  studentInfo: StudentInfo;
}

export default function StudentResultSheet({
  schoolInfo,
  studentInfo,
}: StudentResultSheetProps) {
  return (
    <div className="w-full bg-white p-4">
      {/* Main Container */}
      <div
        className="bg-white border-8 border-double"
        style={{ maxWidth: '8.9in', margin: '0 auto', padding: '10px' }}
      >
        {/* Header Section */}
        <div className="text-center py-2">
          <table className="w-full border-collapse mx-auto" style={{ width: '780px' }}>
            <tbody>
              <tr>
                {/* School Logo */}
                <td rowSpan={2} className="align-top" style={{ width: '75px', height: '75px' }}>
                  <img
                    src={schoolInfo.logo}
                    alt="School Logo"
                    className="rounded"
                    style={{ width: '75px', height: '75px' }}
                  />
                </td>

                {/* School Name */}
                <td className="text-center">
                  <h1
                    className="font-bold m-0 p-0 text-2xl"
                    style={{ fontFamily: 'impact' }}
                  >
                    {schoolInfo.name}
                  </h1>
                </td>

                {/* Right Logo Space */}
                <td rowSpan={2} style={{ width: '75px', height: '75px' }}></td>
              </tr>

              <tr>
                {/* School Address */}
                <td className="text-center font-bold text-base">
                  <div>{schoolInfo.address}</div>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Report Title */}
          <div className="mt-4">
            <h3 className="font-bold text-lg m-0 p-0" style={{ fontFamily: 'arial' }}>
              {schoolInfo.reportType}
            </h3>
            <h5 className="m-0 p-0 mb-1 text-sm">
              {schoolInfo.term} {schoolInfo.academicSession} ACADEMIC SESSION
            </h5>
          </div>
        </div>

        {/* Student Information Section */}
        <div className="mt-6">
          {/* Portal and Admission */}
          <table className="w-full mb-4 border-collapse">
            <tbody>
              <tr className="font-bold">
                <td colSpan={11}>
                  PORTAL ID: <u className="font-bold">{studentInfo.portalId}</u> &nbsp; &nbsp;
                  ADMISSION NUMBER: <u className="font-bold">{studentInfo.admissionNumber}</u>
                </td>
              </tr>
            </tbody>
          </table>

          {/* Student Details */}
          <table className="w-full mb-4 border-collapse">
            <tbody>
              <tr className="font-bold">
                <td className="text-right pr-2">NAME:</td>
                <th className="text-left px-4 border-b">
                  {studentInfo.name}
                </th>
                <td className="min-w-2"></td>
                <td className="min-w-2"></td>
                <td className="text-right pr-2">SEX:</td>
                <th className="text-left px-4 border-b">
                  {studentInfo.sex}
                </th>
                <td className="min-w-2"></td>
                <td className="text-right pr-2">CLASS:</td>
                <th className="text-left px-4 border-b">
                  {studentInfo.class}
                </th>
              </tr>
            </tbody>
          </table>

          {/* Attendance Information */}
          <table className="w-full border-collapse">
            <tbody>
              <tr className="font-bold">
                <td className="text-right pr-2">NO. OF TIMES SCHOOL OPENED:</td>
                <th className="text-left px-4 border-b">
                  {studentInfo.schoolOpened}
                </th>
                <td className="min-w-5"></td>
                <td className="text-right pr-2">ATTENDANCE:</td>
                <th className="text-left px-4 border-b">
                  {studentInfo.attendance}
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Add more sections as needed for grades, comments, etc. */}
      </div>
    </div>
  );
}

// Example usage component
export function StudentResultSheetDemo() {
  const mockSchoolInfo: SchoolInfo = {
    name: "SEAT OF GREATNESS INT'L SCHOOL",
    address: 'OGBOWU AVENUE OFF OBRIKOM ROAD, OMOKU, ONELGA, R/S.',
    logo: 'https://sgis.skul.ng/img/primary_sch_result_sheet_logo.jpg?2026-07-15-05-15-09',
    term: 'THIRD TERM',
    academicSession: '2025/2026',
    reportType: 'NURSERY TERMINAL ASSESSMENT REPORT',
  };

  const mockStudentInfo: StudentInfo = {
    portalId: '99949',
    admissionNumber: '',
    name: 'DANIEL OMERIJI',
    sex: 'Male',
    class: 'NURSERY_1 A',
    schoolOpened: 118,
    attendance: 0,
  };

  return (
    <StudentResultSheet
      schoolInfo={mockSchoolInfo}
      studentInfo={mockStudentInfo}
    />
  );
}