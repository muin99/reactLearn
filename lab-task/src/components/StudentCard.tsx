import PropTypes from 'prop-types'
import type { Student } from '../types'
import { useStudents } from '../context/StudentContext'
import CourseTag from './CourseTag'
import StatBadge from './StatBadge'

function StudentCard(props: { student: Student }) {
  const student = props.student
  const { toggleFavorite, removeStudent } = useStudents()

  let starClass = 'favorite-toggle'
  if (student.isFavorite) {
    starClass = 'favorite-toggle is-favorite'
  }

  return (
    <article className="student-card">
      <button
        type="button"
        className={starClass}
        onClick={() => toggleFavorite(student.id)}
      >
        {student.isFavorite ? '★' : '☆'}
      </button>

      <img className="student-avatar" src={student.avatar} alt={student.name} />
      <h3 className="student-name">{student.name}</h3>
      <p className="student-meta">
        ID: {student.id} - {student.major}
      </p>

      <div className="student-stats">
        <StatBadge label="GPA" value={student.gpa} />
        <StatBadge label="Credits" value={student.credits} />
      </div>

      <div className="student-courses">
        {student.courses.map((course) => (
          <CourseTag key={course.name} courseName={course.name} color={course.color} />
        ))}
      </div>

      <button
        type="button"
        className="remove-student"
        onClick={() => removeStudent(student.id)}
      >
        Remove Student
      </button>
    </article>
  )
}

StudentCard.propTypes = {
  student: PropTypes.object.isRequired,
}

export default StudentCard
