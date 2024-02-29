import { useContext } from "react";
import TaskBody from "../../models/task/TaskBody";
import Modal from "../common/modal/Modal";
import { EditTaskContext, EditTaskProvider } from "../../contexts/EditTaskContext";
import NameField from "../create-tasks/fields/NameField";

const Content = (props: {
  name: string;
  close: () => void;
  submit: (task: TaskBody) => void;
}) => {
  const { taskName } = useContext(EditTaskContext);

  return (
    <Modal
      name="edit task"
      close={props.close}
      submit={() => {
        console.log(taskName);
        props.submit({ name: taskName });
      }}
      form={<NameField />}
    />
  );
};

const TaskEditor = (props: {
  name: string;
  close: () => void;
  submit: (task: TaskBody) => void;
}) => {
  return (
    <EditTaskProvider>
      <Content name={props.name} close={props.close} submit={props.submit} />
    </EditTaskProvider>
  );
};

export default TaskEditor;
