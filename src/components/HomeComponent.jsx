import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutRoute } from '../routes/apiRoutes';
import axios from 'axios';
import { toast } from 'react-toastify';

const HomeComponent = () => {
  const navigate = useNavigate();
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const handleLogout = () => {
    setConfirmationOpen(true);
  };

  const confirmLogout = (confirm) => {
    if (confirm) {
      axios.post(logoutRoute)
        .then(() => {
          navigate('/login');
        })
        .catch((error) => {
          console.error('Logout failed:', error);
        });
    }
    setConfirmationOpen(false);
  };

  const showConfirmation = () => {
    toast.info(
      <div>
        <span>Are you sure you want to logout?</span>
        <div>
          <button onClick={() => confirmLogout(true)}>Yes</button>
          <button onClick={() => confirmLogout(false)}>No</button>
        </div>
      </div>,
      {
        position: 'top-center',
        autoClose: false,
        draggable: true,
        closeButton: true,
        closeOnClick: false,
        onClose: () => {
          setConfirmationOpen(false);
        }
      }
    );
  };

  return (
    <div>
      <h1>HomeComponent</h1>
      <button onClick={handleLogout}>Logout</button>
      {confirmationOpen && showConfirmation()}
    </div>
  );
};

export default HomeComponent;
