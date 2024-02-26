import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SupervisorTaskManagement from "./components/manage-tasks/TaskManager.tsx";
import App from "./App.tsx";
import SupervisorHistoryView from "./components/view-history/SupervisorHistoryView.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/taskmanager" element={<SupervisorTaskManagement />} />
      <Route path="/history" element={<SupervisorHistoryView />} />
    </Routes>
  </BrowserRouter>
);
