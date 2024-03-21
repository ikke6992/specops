const RoleField = (props: {
  setRole: (role: string) => void;
  role: string;
}) => {
  return (
    <>
      <label>Role: </label>
      <select
        className="border rounded-md p-1 outline-none border-gray-400"
        value={props.role}
        onChange={(e) => {
          props.setRole(e.target.value);
        }}
      >
        <option key="admin" value="admin">
          Manager
        </option>
        <option key="manager" value="manager">
          Team Manager
        </option>
        <option key="user" value="user">
          Analyst
        </option>
      </select>
    </>
  );
};

export default RoleField;
