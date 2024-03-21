import Department from "../../../../models/Department";
const DepartmentField = (props: {
  departments: Department[];
  setDept: (dept: string) => void;
  dept: string;
}) => {
  const departmentOptions = props.departments.map((department: Department) => {
    return (
      <option key={department.name} value={department.name}>
        {department.name}
      </option>
    );
  });

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
        {departmentOptions}
      </select>
    </>
  );
};

export default DepartmentField;
