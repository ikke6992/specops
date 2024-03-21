type Props = { name: string; setName: (name: string) => void };
const DepartmentNameField = ({ name, setName }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-y-2 w-fit">
        <div className="grid grid-cols-2 grid-row-1 justify-start items-center">
          <label>Name: </label>
          <input
            type="text"
            className="border rounded-md p-1 outline-none border-gray-400"
            placeholder="Department Name..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DepartmentNameField;
