import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SupervisorTaskManagement from "./components/manage-tasks/TaskManager.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/taskmanager" element={<SupervisorTaskManagement />} />
    </Routes>
  </BrowserRouter>
);
