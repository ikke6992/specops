import { useContext } from "react";
import {
  CreateTaskContext,
  CreateTaskProvider,
} from "../../contexts/CreateTaskContext";
import TaskBody from "../../models/task/TaskBody";
import Modal from "../common/modal/Modal";
import NameField from "./fields/NameField";

const Content = (props: {
  close: () => void;
  submit: (task: TaskBody) => void;
}) => {
  const { taskName } = useContext(CreateTaskContext);

  return (
    <Modal
      name="create task"
      close={props.close}
      submit={() => {
        console.log(taskName);
        props.submit({ name: taskName });
      }}
      form={<NameField />}
    />
  );
};

const TaskCreator = (props: {
  close: () => void;
  submit: (task: TaskBody) => void;
}) => {
  return (
    <CreateTaskProvider>
      <Content close={props.close} submit={props.submit} />
    </CreateTaskProvider>
  );
};

export default TaskCreator;
