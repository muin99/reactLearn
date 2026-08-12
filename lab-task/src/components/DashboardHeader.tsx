import PropTypes from "prop-types";
import { useTheme } from "../context/ThemeContext";
import StatBadge from "./StatBadge";

function DashboardHeader(props: {
  studentCount: number;
  favoritesCount: number;
}) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="dashboard-header">
      <div className="dashboard-header-top">
        <div>
          <h1 className="dashboard-title">Student Dashboard</h1>
          <p className="dashboard-tagline">
            Track, search, and manage your cohort in real time.
          </p>
        </div>
        <button type="button" className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark mode" : "☀️ Light mode"}
        </button>
      </div>

      <nav className="dashboard-nav">
        <a href="#student-list">Students</a>
        <a href="#add-student">Add Student</a>
      </nav>

      <div className="dashboard-stats">
        <StatBadge label="Students" value={props.studentCount} />
        <StatBadge label="Favorites" value={props.favoritesCount} />
      </div>
    </header>
  );
}

DashboardHeader.propTypes = {
  studentCount: PropTypes.number.isRequired,
  favoritesCount: PropTypes.number.isRequired,
};

export default DashboardHeader;
