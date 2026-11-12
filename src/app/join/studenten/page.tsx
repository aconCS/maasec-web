import { StudentsPage, studentsMetadata } from "@/components/students/students-page";

export const metadata = studentsMetadata("nl");

export default function JoinStudentenPage() {
  return <StudentsPage lang="nl" />;
}
