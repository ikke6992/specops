import ReactDOM from "react-dom/client";
import "./index.css";
import { TaskProvider } from "./components/common/TaskContext.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SupervisorTaskManagement from "./components/supervisor-task-management/SupervisorTaskManagement.tsx";
import { TaskListProvider } from "./data/contexts/TaskListContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TaskProvider>
    <TaskListProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/taskmanager" element={<SupervisorTaskManagement />} />
        </Routes>
      </BrowserRouter>
    </TaskListProvider>
  </TaskProvider>
);
