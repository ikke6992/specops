const RoleField = (props: {
  setRole: (role: "analyst" | "team manager" | "manager") => void;
  role: string;
}) => {
  return (
    <>
      <label>Role: </label>
      <select
        className="border rounded-md p-1 outline-none border-gray-400"
        defaultValue={props.role}
        onChange={(e) => {
          props.setRole(
            e.target.value as "analyst" | "team manager" | "manager"
          );
        }}
      >
        <option key="admin">manager</option>
        <option key="manager">team manager</option>
        <option key="user">analyst</option>
      </select>
    </>
  );
};

export default RoleField;
