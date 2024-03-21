import Department from "../../../../models/Department";
import DepartmentField from "./DepartmentField";
import NameField from "./NameField";
import RoleField from "./RoleField";

type Props = {
  dept: string;
  setDept: (dept: string) => void;
  departments: Department[];
  name: string;
  setName: (name: string) => void;
  role: string;
  setRole: (role: "analyst" | "team manager" | "manager") => void;
};

const UserFieldCombination = ({
  dept,
  setDept,
  departments,
  name,
  setName,
  role,
  setRole,
}: Props) => {
  return (
    <div className="grid grid-cols-1 gap-y-2 w-fit">
      <div className="grid grid-cols-2 grid-row-1 justify-start items-center">
        <NameField name={name} setName={setName} />
        <RoleField setRole={setRole} role={role} />
        <DepartmentField
          setDept={setDept}
          dept={dept}
          departments={departments}
        />
      </div>
    </div>
  );
};

export default UserFieldCombination;
