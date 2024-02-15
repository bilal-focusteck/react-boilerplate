import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutRoute } from '../routes/apiRoutes';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeComponent = () => {
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   axios.post(logoutRoute)
  //     .then(() => {
  //       navigate('/login');
  //     })
  //     .catch((error) => {
  //       console.error('Logout failed:', error);
  //     });
  // };
  const handleLogout = () => {
    console.log("handle logout function called");
    toast.info('Are you sure you want to logout?', {
      position: 'top-center',
      autoClose: false,
      draggable: true,
      closeButton: true,
      closeOnClick: false,
      onClose: () => {
        axios.post(logoutRoute)
          .then(() => {
            navigate('/login');
          })
          .catch((error) => {
            console.error('Logout failed:', error);
          });
      }
    });
  }
  return (
    <div>
      <h1>HomeComponent</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomeComponent;
