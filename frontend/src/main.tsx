import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import TaskManager from "./components/manage-tasks/TaskManager.tsx";
import HistoryManager from "./components/manage-history/HistoryManager.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/tasks" element={<TaskManager />} />
      <Route path="/history" element={<HistoryManager />} />
    </Routes>
  </BrowserRouter>
);
