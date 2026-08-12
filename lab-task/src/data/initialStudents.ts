import type { Student } from "../types";

export const initialStudents: Student[] = [
  {
    id: "23001",
    name: "Ayesha Rahman",
    avatar:
      "https://ui-avatars.com/api/?name=Ayesha+Rahman&background=random&bold=true",
    gpa: 3.85,
    credits: 96,
    major: "Computer Science",
    courses: [
      { name: "Data Structures", color: "#2563eb" },
      { name: "Algorithms", color: "#7c3aed" },
    ],
    isFavorite: false,
  },
  {
    id: "23002",
    name: "Tanvir Ahmed",
    avatar:
      "https://ui-avatars.com/api/?name=Tanvir+Ahmed&background=random&bold=true",
    gpa: 3.42,
    credits: 78,
    major: "Electrical Engineering",
    courses: [
      { name: "Circuit Theory", color: "#16a34a" },
      { name: "Signals and Systems", color: "#0891b2" },
    ],
    isFavorite: true,
  },
  {
    id: "23003",
    name: "Nusrat Jahan",
    avatar:
      "https://ui-avatars.com/api/?name=Nusrat+Jahan&background=random&bold=true",
    gpa: 2.95,
    credits: 60,
    major: "Business Administration",
    courses: [
      { name: "Marketing 101", color: "#d97706" },
      { name: "Microeconomics", color: "#db2777" },
    ],
    isFavorite: false,
  },
  {
    id: "23004",
    name: "Sabbir Hossain",
    avatar:
      "https://ui-avatars.com/api/?name=Sabbir+Hossain&background=random&bold=true",
    gpa: 3.99,
    credits: 108,
    major: "Computer Science",
    courses: [
      { name: "Operating Systems", color: "#2563eb" },
      { name: "Databases", color: "#7c3aed" },
    ],
    isFavorite: false,
  },
  {
    id: "23005",
    name: "Farzana Akter",
    avatar:
      "https://ui-avatars.com/api/?name=Farzana+Akter&background=random&bold=true",
    gpa: 3.1,
    credits: 54,
    major: "English Literature",
    courses: [
      { name: "Modern Poetry", color: "#db2777" },
      { name: "Linguistics", color: "#d97706" },
    ],
    isFavorite: false,
  },
];
