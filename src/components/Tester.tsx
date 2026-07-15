import StudentResultSheet from '../components/StudentResultSheet';
import { mockStudentInfo, mockSchoolInfo, mockStudents } from './TesterMockdata';

// Single student
export default function Tester() {
return (
<div>

<StudentResultSheet schoolInfo={mockSchoolInfo} studentInfo={mockStudentInfo} />

// Loop through multiple students
{mockStudents.map((student) => (
  <StudentResultSheet 
    key={student.portalId}
    schoolInfo={mockSchoolInfo} 
    studentInfo={student} 
    />
))}
    </div>
)

}