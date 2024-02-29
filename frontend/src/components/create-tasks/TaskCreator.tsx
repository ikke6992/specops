import { useContext } from "react";
import {
  TaskModalContext,
  TaskModalProvider,
} from "../../contexts/TaskModalContext";
import TaskBody from "../../models/task/TaskBody";
import Modal from "../common/modal/Modal";
import FieldCombination from "./fields/FieldCombination";

const Content = (props: {
  close: () => void;
  submit: (task: TaskBody) => void;
}) => {
  const { taskName } = useContext(TaskModalContext);

  return (
    <Modal
      name="create task"
      close={props.close}
      submit={() => {
        console.log(taskName);
        props.submit({ name: taskName });
      }}
      form={<FieldCombination />}
    />
  );
};

const TaskCreator = (props: {
  close: () => void;
  submit: (task: TaskBody) => void;
}) => {
  return (
    <TaskModalProvider>
      <Content close={props.close} submit={props.submit} />
    </TaskModalProvider>
  );
};

export default TaskCreator;
