import { useEffect } from 'react'
import './App.css'
import { ThemeProvider } from './context/ThemeContext'
import { StudentProvider, useStudents } from './context/StudentContext'
import DashboardHeader from './components/DashboardHeader'
import SearchBar from './components/SearchBar'
import SortControls from './components/SortControls'
import StudentCard from './components/StudentCard'
import AddStudentForm from './components/AddStudentForm'
import LoadingSpinner from './components/LoadingSpinner'

function DashboardContent() {
  const { students, visibleStudents, loading, favoritesCount } = useStudents()

  useEffect(() => {
    if (loading) {
      document.title = 'Student Dashboard - Loading...'
    } else {
      document.title = 'Dashboard - ' + visibleStudents.length + ' Students'
    }
  }, [loading, visibleStudents.length])

  return (
    <div className="dashboard">
      <DashboardHeader studentCount={students.length} favoritesCount={favoritesCount} />

      <main className="dashboard-main">
        <section className="dashboard-controls">
          <SearchBar />
          <SortControls />
        </section>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <section id="student-list" className="student-grid">
            {visibleStudents.length === 0 ? (
              <p className="empty-state">No students match your search.</p>
            ) : (
              visibleStudents.map((student) => <StudentCard key={student.id} student={student} />)
            )}
          </section>
        )}

        <AddStudentForm />
      </main>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <StudentProvider>
        <DashboardContent />
      </StudentProvider>
    </ThemeProvider>
  )
}

export default App
