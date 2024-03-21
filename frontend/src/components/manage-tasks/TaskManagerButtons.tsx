import { useContext, useState } from "react";
import FunctionButton from "../common/buttons/FunctionButton";
import NavigateButton from "../common/buttons/NavigateButton";
import { useNavigate } from "react-router-dom";
import TaskCreator from "./TaskCreator";
import TaskBody from "../../models/task/TaskBody";
import { TaskContext } from "../../contexts/TaskContext";
import { isAdmin, isManager } from "../../services/api-client";
import UserCreator from "../manage-organization/UserCreator";

const TaskManagerButtons = () => {
  const { addTask } = useContext(TaskContext);
  const [showTaskCreator, setShowTaskCreator] = useState(false);
  const [showUserCreator, setShowUserCreator] = useState(false);
  const [showDepartmentCreator, setShowDepartmentCreator] = useState(false);
  const navigate = useNavigate();
  const path = window.location.pathname;

  return (
    <>
      {isAdmin() && path.includes("/list") ? (
        <>
          <NavigateButton
            name="Overview"
            color="cyan"
            navigate={() => {
              navigate("/tasks");
            }}
          />
          <NavigateButton
            name="Manage"
            color="cyan"
            navigate={() => {
              navigate("/manage/users");
            }}
          />
        </>
      ) : path === "/tasks" ? (
        <>
          <NavigateButton
            name="List"
            color="cyan"
            navigate={() => {
              navigate("/list/old");
            }}
          />
          <NavigateButton
            name="Manage"
            color="cyan"
            navigate={() => {
              navigate("/manage/users");
            }}
          />
        </>
      ) : (
        <>
          <NavigateButton
            name="Overview"
            color="cyan"
            navigate={() => {
              navigate("/tasks");
            }}
          />
          <NavigateButton
            name="List"
            color="cyan"
            navigate={() => {
              navigate("/list/old");
            }}
          />
        </>
      )}

      {isManager() ? (
        path === "/tasks" && (
          <FunctionButton
            name="Create Task"
            method={() => setShowTaskCreator(true)}
          />
        )
      ) : (
        <></>
      )}

      {isAdmin() ? (
        path === "/manage/users" && (
          <FunctionButton
            name="Create User"
            method={() => setShowUserCreator(true)}
          />
        )
      ) : (
        <></>
      )}

      {isAdmin() ? (
        path === "/manage/departments" && (
          <FunctionButton
            name="Create Department"
            method={() => setShowDepartmentCreator(true)}
          />
        )
      ) : (
        <></>
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

      {path.includes("/manage") && (
        <FunctionButton
          name={path.includes("/users") ? "Departments" : "Users"}
          method={() => {
            if (path === "/manage/users") {
              navigate("/manage/departments");
            } else {
              navigate("/manage/users");
            }
          }}
        />
      )}

      {showTaskCreator && (
        <TaskCreator
          submit={(task: TaskBody) => addTask(task)}
          close={() => setShowTaskCreator(false)}
        />
      )}

      {showDepartmentCreator && (
        <TaskCreator
          submit={(task: TaskBody) => addTask(task)}
          close={() => setShowDepartmentCreator(false)}
        />
      )}

      {showUserCreator && (
        <UserCreator close={() => setShowUserCreator(false)} />
      )}
    </>
  );
};

export default TaskManagerButtons;
