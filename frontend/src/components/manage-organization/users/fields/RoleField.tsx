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
          manager
        </option>
        <option key="manager" value="manager">
          team Manager
        </option>
        <option key="user" value="user">
          analyst
        </option>
      </select>
    </>
  );
};

export default RoleField;
