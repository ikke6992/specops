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
  const path = window.location.pathname;

  return (
    <>
      {path.includes("/list") ? (
        <NavigateButton
          name="Overview"
          color="cyan"
          navigate={() => {
            navigate("/tasks");
          }}
        />
      ) : (
        <NavigateButton
          name="List"
          color="cyan"
          navigate={() => {
            navigate("/list/old");
          }}
        />
      )}

      {path === "/tasks" && (
        <FunctionButton
          name="Create Task"
          method={() => setShowCreator(true)}
        />
      )}

      {path.includes("/list") && (
        <FunctionButton
          name={path.includes("/old") ? "Tasks" : "History"}
          method={() => {
            if (path === "/list/old") {
              navigate("/list/current");
            } else {
              navigate("/list/old");
            }
          }}
        />
      )}

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
