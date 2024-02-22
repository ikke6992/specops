import { useContext, useState } from "react"
import postItem from "../../data/services/postItem";
import { TaskContext } from "../common/TaskContext";

const AddTask = () => {
  const { taskName, setTaskName } = useContext(TaskContext);

  return (
    <label>Name: <input type='text' placeholder='task name' value={ taskName } onChange={(e) => {setTaskName(e.target.value)}} /></label>
  )
}

export default AddTask;