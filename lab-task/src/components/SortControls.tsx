import { useStudents } from "../context/StudentContext";

function SortControls() {
  const { sortBy, setSortBy } = useStudents();

  let defaultClass = "sort-button";
  let nameClass = "sort-button";
  let gpaClass = "sort-button";

  if (sortBy === "default") {
    defaultClass = "sort-button is-active";
  } else if (sortBy === "name") {
    nameClass = "sort-button is-active";
  } else if (sortBy === "gpa") {
    gpaClass = "sort-button is-active";
  }

  return (
    <div className="sort-controls">
      <button
        type="button"
        className={defaultClass}
        onClick={() => setSortBy("default")}
      >
        Default
      </button>
      <button
        type="button"
        className={nameClass}
        onClick={() => setSortBy("name")}
      >
        Name (A-Z)
      </button>
      <button
        type="button"
        className={gpaClass}
        onClick={() => setSortBy("gpa")}
      >
        GPA (High-Low)
      </button>
    </div>
  );
}

export default SortControls;
