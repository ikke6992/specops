import Department from "../../../../models/Department";
const DepartmentField = (props: {
  departments: Department[];
  setDept: (dept: string) => void;
  dept: string;
}) => {
  return (
    <>
      <label>Department: </label>
      <select
        className="border rounded-md p-1 outline-none border-gray-400"
        value={props.dept}
        onChange={(e) => {
          props.setDept(e.target.value);
        }}
      >
        {props.departments.map((department: Department) => {
          return <option key={department.name}>{department.name}</option>;
        })}
      </select>
    </>
  );
};

export default DepartmentField;
