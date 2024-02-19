import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutRoute } from '../routes/apiRoutes';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import verifyToken from '../middlewares/CheckToken';
import { useAuth } from '../hooks/AuthContext';

const HomeComponent = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    console.log("above toast info")
    toast.info(
      <div>
        <span>Are you sure you want to logout?</span>
        <div style={{ margin: "10px" }}>
          <Button variant="contained" color="primary" style={{ marginRight: "10px" }} onClick={confirmLogout}>
            Yes
          </Button>
          <Button variant="contained" color="secondary" onClick={() => toast.dismiss()}>
            No
          </Button>
        </div>
      </div>,
      {
        position: 'top-center',
        autoClose: false,
        draggable: true,
        closeButton: true,
        closeOnClick: false
      }
    );
  };

  const confirmLogout = () => {
    console.log("inside of the verify token")
    axios.post(logoutRoute)
      .then(() => {
        localStorage.removeItem('token');
        logout();
        navigate('/login');
        toast.dismiss();
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });

  };
  return (
    <div>
      <h1>HomeComponent</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomeComponent;
