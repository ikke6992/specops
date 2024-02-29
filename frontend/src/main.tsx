import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import TaskManager from "./components/manage-tasks/TaskManager.tsx";
import HistoryManager from "./components/manage-history/HistoryManager.tsx";
import DepartmentTest from "./components/test/DepartmentTest.tsx";
import UserTest from "./components/test/UserTest.tsx";
import TaskTest from "./components/test/TaskTest.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/testing" element={<App />} />
      <Route path="/tasks" element={<TaskManager />} />
      <Route path="/history" element={<HistoryManager />} />
      <Route path="/task-test" element={<TaskTest />} />
      <Route path="/user-test" element={<UserTest />} />
      <Route path="/department-test" element={<DepartmentTest />} />
    </Routes>
  </BrowserRouter>
);
