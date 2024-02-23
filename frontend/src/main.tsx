import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SupervisorTaskManagement from "./components/supervisor-task-management/SupervisorTaskManagement.tsx";
import { TaskProvider } from "./data/contexts/TaskContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TaskProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/taskmanager" element={<SupervisorTaskManagement />} />
      </Routes>
    </BrowserRouter>
  </TaskProvider>
);
