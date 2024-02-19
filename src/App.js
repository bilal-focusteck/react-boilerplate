import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import navbarComponent from './components/navbarComponent';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './hooks/AuthContext';

function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <navbarComponent />,
  //   },
  //   {
  //     path: "/register",
  //     element: <Register />,
  //   }
  // ])
  return (
    <div>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path='/' Component={HomeComponent} />
            <Route path='/navbar' Component={navbarComponent} />
            <Route path='/signup' Component={Register} />
            <Route path='/login' Component={LoginComponent} />

            {/* <Route Component={Layout}>
          <Route path='/dashboard' Component={Dashboard} />
          <Route path='/projects' Component={Projects} />
          <Route path='/resources' Component={Resources} />
          <Route path='/user/:id' Component={UserProfile} />
          <Route path='/project/:id' Component={Project} />
          <Route path='/integrations' Component={Integrations} />
          <Route path='/test' Component={Test} />
        </Route> */}
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;