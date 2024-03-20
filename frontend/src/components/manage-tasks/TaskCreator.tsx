import { useContext, useEffect } from "react";
import {
  TaskModalContext,
  TaskModalProvider,
} from "../../contexts/TaskModalContext";
import TaskBody from "../../models/task/TaskBody";
import Modal from "../common/modal/Modal";
import FieldCombination from "./fields/FieldCombination";
import { DepartmentContext, DepartmentProvider } from "../../contexts/DepartmentContext";

const Content = (props: {
  close: () => void;
  submit: (task: TaskBody) => void;
}) => {
  const { taskName, dept, timeframe, interval, deadline, setDept } =
    useContext(TaskModalContext);
  const {departments} = useContext(DepartmentContext);

  useEffect(() => {
    const department = departments.length === 0 ? "General" : departments[0].name;
    setDept(department);
  }, []);

  return (
    <Modal
      name="Create Task"
      edit={false}
      close={props.close}
      deactivate={props.close}
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

const TaskCreator = (props: {
  close: () => void;
  submit: (task: TaskBody) => void;
}) => {
  return (
    <TaskModalProvider>
      <DepartmentProvider>
        <Content close={props.close} submit={props.submit} />
      </DepartmentProvider>
    </TaskModalProvider>
  );
};

export default TaskCreator;
