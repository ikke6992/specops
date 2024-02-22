import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { TaskProvider } from './components/common/TaskContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TaskProvider>
    <App />
  </TaskProvider>,
)
