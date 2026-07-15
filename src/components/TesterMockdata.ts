import { StudentInfo, SchoolInfo } from './StudentResultSheet';

// Single Student Mock Data
export const mockStudentInfo: StudentInfo = {
  portalId: '99949',
  admissionNumber: 'SG/2025/001',
  name: 'DANIEL OMERIJI',
  sex: 'Male',
  class: 'NURSERY_1 A',
  schoolOpened: 118,
  attendance: 115,
};

// School Information Mock Data
export const mockSchoolInfo: SchoolInfo = {
  name: "SEAT OF GREATNESS INT'L SCHOOL",
  address: 'OGBOWU AVENUE OFF OBRIKOM ROAD, OMOKU, ONELGA, R/S.',
  logo: 'https://sgis.skul.ng/img/primary_sch_result_sheet_logo.jpg?2026-07-15-05-15-09',
  term: 'THIRD TERM',
  academicSession: '2025/2026',
  reportType: 'NURSERY TERMINAL ASSESSMENT REPORT',
};

// Multiple Students for Testing
export const mockStudents: StudentInfo[] = [
  {
    portalId: '99949',
    admissionNumber: 'SG/2025/001',
    name: 'DANIEL OMERIJI',
    sex: 'Male',
    class: 'NURSERY_1 A',
    schoolOpened: 118,
    attendance: 115,
  },
  {
    portalId: '99950',
    admissionNumber: 'SG/2025/002',
    name: 'CHIOMA OBINNA',
    sex: 'Female',
    class: 'NURSERY_1 A',
    schoolOpened: 118,
    attendance: 118,
  },
  {
    portalId: '99951',
    admissionNumber: 'SG/2025/003',
    name: 'FAVOUR OKONKWO',
    sex: 'Male',
    class: 'NURSERY_1 B',
    schoolOpened: 118,
    attendance: 112,
  },
  {
    portalId: '99952',
    admissionNumber: 'SG/2025/004',
    name: 'PRECIOUS AMADI',
    sex: 'Female',
    class: 'NURSERY_1 B',
    schoolOpened: 118,
    attendance: 118,
  },
  {
    portalId: '99953',
    admissionNumber: 'SG/2025/005',
    name: 'TUNDE ADEYEMI',
    sex: 'Male',
    class: 'NURSERY_1 A',
    schoolOpened: 118,
    attendance: 110,
  },
];

// Multiple Schools for Testing
export const mockSchools: SchoolInfo[] = [
  {
    name: "SEAT OF GREATNESS INT'L SCHOOL",
    address: 'OGBOWU AVENUE OFF OBRIKOM ROAD, OMOKU, ONELGA, R/S.',
    logo: 'https://sgis.skul.ng/img/primary_sch_result_sheet_logo.jpg?2026-07-15-05-15-09',
    term: 'THIRD TERM',
    academicSession: '2025/2026',
    reportType: 'NURSERY TERMINAL ASSESSMENT REPORT',
  },
  {
    name: 'LEGACY ACADEMY',
    address: '45 IKOYI LANE, LAGOS, LAGOS STATE.',
    logo: 'https://via.placeholder.com/75?text=LEGACY',
    term: 'SECOND TERM',
    academicSession: '2025/2026',
    reportType: 'PRIMARY ASSESSMENT REPORT',
  },
  {
    name: 'EXCELLENCE HALLS',
    address: '120 LEKKI EXPRESS, LEKKI, LAGOS STATE.',
    logo: 'https://via.placeholder.com/75?text=EXCEL',
    term: 'FIRST TERM',
    academicSession: '2025/2026',
    reportType: 'SECONDARY ASSESSMENT REPORT',
  },
];