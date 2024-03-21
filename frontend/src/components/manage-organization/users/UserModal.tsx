import { useContext, useEffect, useState } from "react";
import Modal from "../../common/modal/Modal";
import getAll from "../../../services/getAll";
import UserFieldCombination from "./fields/UserFieldCombination";
import { OrganizationContext } from "../../../contexts/OrganizationContext";

type roleType = "analyst" | "team manager" | "manager";
const UserModal = (props: {
  close: () => void;
  type: "create" | "edit";
  id?: string;
  initialDepartment?: string;
  initialName?: string;
  initialRole?: roleType;
}) => {
  const [department, setDepartment] = useState(
    props.initialDepartment ? props.initialDepartment : ""
  );
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState(props.initialName ? props.initialName : "");
  const [role, setRole] = useState<roleType>(
    props.initialRole ? props.initialRole : "analyst"
  );
  const { submitUser } = useContext(OrganizationContext);

  useEffect(() => {
    const getDepartment = async () => {
      const data = await getAll("departments");
      setDepartments(data);
      if (!department) setDepartment(data[0].name);
    };
    getDepartment();
  }, []);

  return (
    <Modal
      name={`${props.type === "create" ? "Create User" : "Edit User"}`}
      edit={false}
      close={props.close}
      deactivate={props.close}
      submit={() => {
        if (props.id) submitUser(props.type, name, role, department, props.id);
        else submitUser(props.type, name, role, department);
      }}
      form={
        <>
          <UserFieldCombination
            departments={departments}
            dept={department}
            setDept={setDepartment}
            name={name}
            setName={setName}
            role={role}
            setRole={setRole}
          />
        </>
      }
    />
  );
};

export default UserModal;
