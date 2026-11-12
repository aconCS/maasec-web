import { StudentsThanksPage, studentsThanksMetadata } from "@/components/students/students-page";

export const metadata = studentsThanksMetadata("nl");

export default function JoinStudentenBedanktPage() {
  return <StudentsThanksPage lang="nl" />;
}
