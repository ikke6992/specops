import { useContext, useEffect } from "react";
import TaskBody from "../../models/task/TaskBody";
import Modal from "../common/modal/Modal";
import {
  TaskModalContext,
  TaskModalProvider,
} from "../../contexts/TaskModalContext";
import FieldCombination from "./fields/FieldCombination";

const Content = (props: {
  name: string;
  close: () => void;
  submit: (task: TaskBody) => void;
}) => {
  const { taskName, setTaskName, timeframe, interval, deadline } =
    useContext(TaskModalContext);

    useEffect(() => {
      if (taskName === "") {
        setTaskName(props.name);
      }
    })

  return (
    <Modal
      name="edit task"
      close={props.close}
      submit={() => {
        console.log(taskName);
        props.submit({
          name: taskName,
          timeframe: timeframe,
          interval: interval,
          deadline: deadline,
        });
      }}
      form={<FieldCombination />}
    />
  );
};

const TaskEditor = (props: {
  name: string;
  close: () => void;
  submit: (task: TaskBody) => void;
}) => {
  return (
    <TaskModalProvider>
      <Content name={props.name} close={props.close} submit={props.submit} />
    </TaskModalProvider>
  );
};

export default TaskEditor;
