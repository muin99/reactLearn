import { createContext, useContext, useEffect, useState } from "react";
import { initialStudents } from "../data/initialStudents";
import type { Student } from "../types";

const StudentContext = createContext({
  students: [] as Student[],
  visibleStudents: [] as Student[],
  loading: true,
  searchQuery: "",
  setSearchQuery: (_query: string) => {},
  sortBy: "default",
  setSortBy: (_sort: string) => {},
  favoritesCount: 0,
  toggleFavorite: (_id: string) => {},
  addStudent: (_student: Student) => {},
  removeStudent: (_id: string) => {},
  isIdTaken: (_id: string): boolean => false,
});

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const saved = localStorage.getItem("students");

    if (saved) {
      setStudents(JSON.parse(saved));
      setLoading(false);
    } else {
      setTimeout(() => {
        setStudents(initialStudents);
        setLoading(false);
      }, 1500);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("students", JSON.stringify(students));
    }
  }, [students, loading]);

  function toggleFavorite(id: string) {
    const updated = students.map((student) => {
      if (student.id === id) {
        return { ...student, isFavorite: !student.isFavorite };
      }
      return student;
    });
    setStudents(updated);
  }

  function addStudent(student: Student) {
    setStudents([...students, student]);
  }

  function removeStudent(id: string) {
    const updated = students.filter((student) => student.id !== id);
    setStudents(updated);
  }

  function isIdTaken(id: string) {
    return students.some((student) => student.id === id);
  }

  let favoritesCount = 0;
  for (const student of students) {
    if (student.isFavorite) {
      favoritesCount = favoritesCount + 1;
    }
  }

  let visibleStudents = students;

  if (searchQuery.trim() !== "") {
    const query = searchQuery.toLowerCase();
    visibleStudents = visibleStudents.filter((student) => {
      return (
        student.name.toLowerCase().includes(query) ||
        student.major.toLowerCase().includes(query)
      );
    });
  }

  visibleStudents = [...visibleStudents];

  if (sortBy === "name") {
    visibleStudents.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "gpa") {
    visibleStudents.sort((a, b) => b.gpa - a.gpa);
  }

  const value = {
    students,
    visibleStudents,
    loading,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    favoritesCount,
    toggleFavorite,
    addStudent,
    removeStudent,
    isIdTaken,
  };

  return (
    <StudentContext.Provider value={value}>{children}</StudentContext.Provider>
  );
}

export function useStudents() {
  return useContext(StudentContext);
}
