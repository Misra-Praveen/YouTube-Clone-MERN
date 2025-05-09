import React from 'react'
import Sidebar from '../components/Sidebar';
import { useOutletContext } from 'react-router-dom';

const Home = () => {

const { sidebarOpen } = useOutletContext();

  return (
    <div className='flex'>
      <Sidebar isOpen={sidebarOpen}  />
    </div>
  )
}

export default Home