import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SupervisorTaskManagement from "./components/supervisor-task-management/SupervisorTaskManagement.tsx";
import { TaskProvider } from "./data/contexts/TaskContext.tsx";
import TaskTest from "./components/task-test/TaskTest.tsx";
import UserTest from "./components/user-test/UserTest.tsx";
import App from "./App.tsx";
import DepartmentTest from "./components/department-test/DepartmentTest.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TaskProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/testing" element={<App />} />
        <Route path="/taskmanager" element={<SupervisorTaskManagement />} />
        <Route path="/task-test" element={<TaskTest />} />
        <Route path="/user-test" element={<UserTest />} />
        <Route path="/department-test" element={<DepartmentTest />} />
      </Routes>
    </BrowserRouter>
  </TaskProvider>
);
