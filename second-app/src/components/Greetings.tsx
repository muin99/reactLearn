type GreetingsProps = {
  name: string;
  age?: number | string;
  profession?: string;
};

export default function Greetings({
  name,
  age = "not specified",
  profession = "not specified",
}: GreetingsProps) {
  return (
    <div>
      <p>Hello {name} </p>
      <p>Your age is: {age}</p>
      <p>Your profession is: {profession}</p>
    </div>
  );
}
