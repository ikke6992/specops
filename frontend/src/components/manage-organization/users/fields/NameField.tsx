type Props = { name: string; setName: (name: string) => void };
const NameField = ({ name, setName }: Props) => {
  return (
    <>
      <label>Name: </label>
      <input
        type="text"
        className="border rounded-md p-1 outline-none border-gray-400"
        placeholder="Employee Name..."
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
    </>
  );
};

export default NameField;
