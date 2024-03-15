import { useContext, useEffect } from "react";
import TaskBody from "../../models/task/TaskBody";
import Modal from "../common/modal/Modal";
import {
  TaskModalContext,
  TaskModalProvider,
} from "../../contexts/TaskModalContext";
import FieldCombination from "./fields/FieldCombination";
import { DepartmentProvider } from "../../contexts/DepartmentContext";

const Content = (props: {
  name: string;
  dept: string;
  timeframe: string;
  interval: string;
  deadline: string;
  close: () => void;
  submit: (task: TaskBody) => void;
}) => {
  const {
    taskName,
    timeframe,
    interval,
    deadline,
    dept,
    setTaskName,
    setTimeframe,
    setInterval,
    setDeadline,
    setDept,
  } = useContext(TaskModalContext);

  useEffect(() => {
    if (taskName === "") setTaskName(props.name);
    if (timeframe === 0) setTimeframe(parseInt(props.timeframe));
    if (interval === 0) setInterval(parseInt(props.interval));
    if (deadline === "") setDeadline(props.deadline);
    if (dept === "") setDept(props.dept);
  }, []);

  return (
    <Modal
      name="edit task"
      close={props.close}
      submit={() => {
        props.submit({
          name: taskName,
          dept: dept,
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
  timeframe: string;
  interval: string;
  deadline: string;
  dept: string;
  close: () => void;
  submit: (task: TaskBody) => void;
}) => {
  return (
    <TaskModalProvider>
      <DepartmentProvider>
        <Content
          name={props.name}
          dept={props.dept}
          timeframe={props.timeframe}
          interval={props.interval}
          deadline={props.deadline}
          close={props.close}
          submit={props.submit}
        />
      </DepartmentProvider>
    </TaskModalProvider>
  );
};

export default TaskEditor;
