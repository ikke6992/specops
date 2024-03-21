import { useEffect, useState } from "react";
import Modal from "../../common/modal/Modal";
import getAll from "../../../services/getAll";
import UserFieldCombination from "./fields/UserFieldCombination";

const UserCreator = (props: { close: () => void }) => {
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

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
      name="Create User"
      edit={false}
      close={props.close}
      deactivate={props.close}
      submit={() => {}}
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

export default UserCreator;
