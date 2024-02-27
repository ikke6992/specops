import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskManager from "./components/manage-tasks/TaskManager.tsx";
import App from "./App.tsx";
import TaskTest from "./components/test/TaskTest.tsx";
import UserTest from "./components/test/UserTest.tsx";
import DepartmentTest from "./components/test/DepartmentTest.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/testing" element={<App />} />
      <Route path="/taskmanager" element={<TaskManager />} />
      <Route path="/task-test" element={<TaskTest />} />
      <Route path="/user-test" element={<UserTest />} />
      <Route path="/department-test" element={<DepartmentTest />} />
    </Routes>
  </BrowserRouter>
);
