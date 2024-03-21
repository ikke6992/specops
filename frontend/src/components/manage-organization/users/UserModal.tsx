import { useContext, useEffect, useState } from "react";
import Modal from "../../common/modal/Modal";
import getAll from "../../../services/getAll";
import UserFieldCombination from "./fields/UserFieldCombination";
import { OrganizationContext } from "../../../contexts/OrganizationContext";
import { web } from "../../../services/api-client";

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
  const [showLink, setShowLink] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const getDepartment = async () => {
      const data = await getAll("departments");
      setDepartments(data);
      if (!department) setDepartment(data[0].name);
    };
    getDepartment();
  }, []);

  return (
    <>
      <Modal
        name={
          showLink
            ? "Share link"
            : `${props.type === "create" ? "Create User" : "Edit User"}`
        }
        edit={false}
        close={() => {
          if (props.type === "create") {
            if (!showLink) setShowLink(true);
            if (showLink) props.close();
          } else {
            props.close();
          }
        }}
        deactivate={() => {}}
        submit={async () => {
          if (props.id) {
            submitUser(props.type, name, role, department, props.id);
          } else {
            const dataId = await submitUser(props.type, name, role, department);
            setId(dataId);
          }
        }}
        form={
          <>
            {showLink ? (
              <p>{`${web}/signup/${id}`}</p>
            ) : (
              <UserFieldCombination
                departments={departments}
                dept={department}
                setDept={setDepartment}
                name={name}
                setName={setName}
                role={role}
                setRole={setRole}
              />
            )}
          </>
        }
      />
    </>
  );
};

export default UserModal;
