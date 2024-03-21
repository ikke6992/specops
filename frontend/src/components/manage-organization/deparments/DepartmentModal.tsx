import { useContext, useState } from "react";
import Modal from "../../common/modal/Modal";
import DepartmentNameField from "./DepartmentNameField";
import { OrganizationContext } from "../../../contexts/OrganizationContext";

const DepartmentModal = (props: {
  close: () => void;
  type: "create" | "edit";
}) => {
  const [name, setName] = useState("");
  const { submitDepartment } = useContext(OrganizationContext);

  return (
    <Modal
      name={`${
        props.type === "create" ? "Create Department" : "Edit Department"
      }`}
      edit={false}
      close={props.close}
      deactivate={props.close}
      submit={() => submitDepartment(props.type, name)}
      form={
        <>
          <DepartmentNameField name={name} setName={setName} />
        </>
      }
    />
  );
};

export default DepartmentModal;
