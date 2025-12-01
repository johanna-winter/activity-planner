export default function ActivityDetails({ onClick, id }) {
  return (
    <>
      <h1>Hello World!</h1>
      <button onClick={() => onClick(id)}>DELETE</button>
    </>
  );
}
