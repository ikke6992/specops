import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TaskProvider } from './components/common/TaskContext.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SupervisorTaskManagement from './components/supervisor-task-management/SupervisorTaskManagement.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TaskProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/taskmanager" element={<SupervisorTaskManagement />} />
    </Routes>
    </BrowserRouter>
  </TaskProvider>,
)
