import React, {useState} from 'react'
import Header from './components/Header'
import { Outlet } from "react-router-dom";

const App = () => {
const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  console.log("Sidebar is open?", sidebarOpen);

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <Outlet context={{ sidebarOpen }} />
    </div>
  )
}

export default App