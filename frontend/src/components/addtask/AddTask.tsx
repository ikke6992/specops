import { useState } from "react"
import postItem from "../../data/services/postItem";

const AddTask = () => {
  const [taskName, setTaskName] = useState<string>("");

  const handleFormSubmit = () => {
    postItem("tasks", {name: taskName});
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleFormSubmit();
    }}>
      <label>Task Name: <input type='text' placeholder='task name' value={taskName} onChange={(e) => {setTaskName(e.target.value)}} /></label>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default AddTask;