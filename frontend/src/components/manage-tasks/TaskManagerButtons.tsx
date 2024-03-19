import { useContext, useState } from "react";
import FunctionButton from "../common/buttons/FunctionButton";
import NavigateButton from "../common/buttons/NavigateButton";
import { useNavigate } from "react-router-dom";
import TaskCreator from "./TaskCreator";
import TaskBody from "../../models/task/TaskBody";
import { TaskContext } from "../../contexts/TaskContext";

const TaskManagerButtons = () => {
  const { addTask } = useContext(TaskContext);
  const [showCreator, setShowCreator] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <NavigateButton
        name="Overwiew"
        navigate={() => {
          navigate("/tasks");
        }}
      />
      <NavigateButton
        name="History"
        navigate={() => {
          navigate("/history");
        }}
      />

      <FunctionButton name="Create Task" method={() => setShowCreator(true)} />
      {showCreator && (
        <TaskCreator
          submit={(task: TaskBody) => addTask(task)}
          close={() => setShowCreator(false)}
        />
      )}
    </>
  );
};

export default TaskManagerButtons;
