import BackHome from "@/components/BackHome";
import SimpleForm from "@/components/SimpleForm";

export default function FormsPage() {
  return (
    <main>
      <BackHome />
      <h1>9. Form Validation</h1>
      <p>Check the values before accepting the form.</p>
      <SimpleForm />
      <pre>{`if (name === "" || !email.includes("@")) {
  setError("Enter valid information");
  return;
}`}</pre>
    </main>
  );
}
