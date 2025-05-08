import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { lazy,Suspense } from 'react';

const Login = lazy(()=>import("./pages/Login.jsx"))
const Register = lazy(()=>import("./pages/Register.jsx"))


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {
        path:"/login",
        element:<Login />
      },
      {      
        path:"/register",
        element:<Register />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter} />
  </StrictMode>,
)
