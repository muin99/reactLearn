import { useEffect, useState } from "react";
import { useStudents } from "../context/StudentContext";

const emptyForm = { name: "", id: "", major: "", gpa: "", courses: "" };
const courseColors = [
  "#2563eb",
  "#7c3aed",
  "#16a34a",
  "#0891b2",
  "#d97706",
  "#db2777",
];

function AddStudentForm() {
  const { addStudent, isIdTaken } = useStudents();
  const [form, setForm] = useState(emptyForm);
  const [nameError, setNameError] = useState("");
  const [idError, setIdError] = useState("");
  const [majorError, setMajorError] = useState("");
  const [gpaError, setGpaError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (successMessage === "") {
      return;
    }
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  function updateField(field: string, value: string) {
    setForm({ ...form, [field]: value });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    let nameErrorText = "";
    let idErrorText = "";
    let majorErrorText = "";
    let gpaErrorText = "";

    if (form.name.trim() === "") {
      nameErrorText = "Full name is required.";
    }

    if (form.id.trim() === "") {
      idErrorText = "Student ID is required.";
    } else if (!/^\d+$/.test(form.id.trim())) {
      idErrorText = "Student ID must be numeric.";
    } else if (isIdTaken(form.id.trim())) {
      idErrorText = "That Student ID is already in use.";
    }

    if (form.major.trim() === "") {
      majorErrorText = "Major is required.";
    }

    const gpaValue = Number(form.gpa);
    if (form.gpa.trim() === "" || Number.isNaN(gpaValue)) {
      gpaErrorText = "GPA is required.";
    } else if (gpaValue < 0 || gpaValue > 4.0) {
      gpaErrorText = "GPA must be between 0 and 4.0.";
    }

    setNameError(nameErrorText);
    setIdError(idErrorText);
    setMajorError(majorErrorText);
    setGpaError(gpaErrorText);

    if (nameErrorText || idErrorText || majorErrorText || gpaErrorText) {
      return;
    }

    const courseNames = form.courses
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name !== "");

    const courses = courseNames.map((name, index) => {
      return { name, color: courseColors[index % courseColors.length] };
    });

    addStudent({
      id: form.id.trim(),
      name: form.name.trim(),
      major: form.major.trim(),
      gpa: gpaValue,
      credits: 0,
      avatar:
        "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(form.name.trim()) +
        "&background=random&bold=true",
      courses: courses,
      isFavorite: false,
    });

    setForm(emptyForm);
    setNameError("");
    setIdError("");
    setMajorError("");
    setGpaError("");
    setSuccessMessage(form.name.trim() + " was added to the dashboard.");
  }

  return (
    <section id="add-student" className="add-student-form">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="student-name">Full Name</label>
          <input
            id="student-name"
            type="text"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
          />
          {nameError && <p className="field-error">{nameError}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="student-id">Student ID</label>
          <input
            id="student-id"
            type="text"
            value={form.id}
            onChange={(event) => updateField("id", event.target.value)}
          />
          {idError && <p className="field-error">{idError}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="student-major">Major</label>
          <input
            id="student-major"
            type="text"
            value={form.major}
            onChange={(event) => updateField("major", event.target.value)}
          />
          {majorError && <p className="field-error">{majorError}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="student-gpa">GPA</label>
          <input
            id="student-gpa"
            type="text"
            value={form.gpa}
            onChange={(event) => updateField("gpa", event.target.value)}
          />
          {gpaError && <p className="field-error">{gpaError}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="student-courses">Courses (comma-separated)</label>
          <input
            id="student-courses"
            type="text"
            value={form.courses}
            onChange={(event) => updateField("courses", event.target.value)}
            placeholder="Data Structures, Algorithms"
          />
        </div>

        <button type="submit" className="submit-button">
          Add Student
        </button>

        {successMessage && <p className="form-success">{successMessage}</p>}
      </form>
    </section>
  );
}

export default AddStudentForm;
