import { useState } from "react";
import Modal from "../../common/modal/Modal";
import DepartmentNameField from "./DepartmentNameField";

const DepartmentCreator = (props: { close: () => void }) => {
  const [name, setName] = useState("");

  return (
    <Modal
      name="Create Department"
      edit={false}
      close={props.close}
      deactivate={props.close}
      submit={() => {}}
      form={
        <>
          <DepartmentNameField name={name} setName={setName} />
        </>
      }
    />
  );
};

export default DepartmentCreator;
