import "./App.css";
import CustomComponents from "./components/customComponents";
import Greetings from "./components/Greetings";

function App() {
  const isAdmin: boolean = false;

  type Cat = {
    id: number;
    name: string;
  };
  type Student = {
    id: string;
    age: string;
    cgpa: string;
  };

  const cats: Cat[] = [
    {
      id: 2,
      name: "mew",
    },
    {
      id: 3,
      name: "meww",
    },
  ];
  const students: Student[] = [
    {
      id: "23-333",
      age: "Student 2",
      cgpa: "3.33",
    },
  ];

  return (
    <>
      {isAdmin ? <p>Welcome Admin</p> : <p>Welcome User</p>}
      {isAdmin && <button>Click me</button>}
      <CustomComponents></CustomComponents>

      {students.map((student) => (
        <div key={student.id}>
          <p>{student.id}</p>
          <p>CGPA: {student.cgpa}</p>
        </div>
      ))}

      {cats.map((cat) => (
        <div key={cat.id}>
          <p>ID: {cat.id}</p>
          <p>Name: {cat.name}</p>
        </div>
      ))}
      <Greetings name="muin" age={22} />
      <Greetings name="Raisa" profession="programming" />
    </>
  );
}

export default App;
