import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import navbarComponent from './components/navbarComponent';
import HomeComponent from './components/HomeComponent';

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
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={HomeComponent} />
        <Route path='/navbar' Component={navbarComponent} />
        <Route path='/signup' Component={Register} />
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
    // ReactDOM.createRoot(document.getElementById('root')).render(
    //   <React.StrictMode>
    //     <RouterProvider router={router} />
    //   </React.StrictMode>
    // )
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;