import { useContext, useEffect, useState } from "react";
import Modal from "../../common/modal/Modal";
import getAll from "../../../services/getAll";
import UserFieldCombination from "./fields/UserFieldCombination";
import { OrganizationContext } from "../../../contexts/OrganizationContext";

const UserModal = (props: {
  close: () => void;
  type: "create" | "edit";
  id?: string;
}) => {
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const { submitUser } = useContext(OrganizationContext);

  useEffect(() => {
    const getDepartment = async () => {
      const data = await getAll("departments");
      setDepartments(data);
      setDepartment(data[0].name);
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
