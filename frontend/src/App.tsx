import getAll from "./data/services/getAll";

const App = () => {

  const data = getAll("tasks");
  console.log(data);
  return (
    <>
      <p>print</p>
    </>
  );
};

export default App;
