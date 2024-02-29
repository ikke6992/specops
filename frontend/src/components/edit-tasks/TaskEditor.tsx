import { useContext } from "react";
import TaskBody from "../../models/task/TaskBody";
import Modal from "../common/modal/Modal";
import {
  TaskModalContext,
  TaskModalProvider,
} from "../../contexts/TaskModalContext";
import NameField from "../create-tasks/fields/NameField";

const Content = (props: {
  close: () => void;
  submit: (task: TaskBody) => void;
}) => {
  const { taskName } = useContext(TaskModalContext);

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
  close: () => void;
  submit: (task: TaskBody) => void;
}) => {
  return (
    <TaskModalProvider>
      <Content close={props.close} submit={props.submit} />
    </TaskModalProvider>
  );
};

export default TaskEditor;
