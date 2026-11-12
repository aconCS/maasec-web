import { StudentsPage, studentsMetadata } from "@/components/students/students-page";

export const metadata = studentsMetadata("en");

export default function JoinStudentsPage() {
  return <StudentsPage lang="en" />;
}
