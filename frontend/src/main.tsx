import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SupervisorTaskManagement from "./components/manage-tasks/TaskManager.tsx";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/taskmanager" element={<SupervisorTaskManagement />} />
    </Routes>
  </BrowserRouter>
);
