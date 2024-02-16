// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { logoutRoute } from '../routes/apiRoutes';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const HomeComponent = () => {
//   const navigate = useNavigate();
//   const [confirmationOpen, setConfirmationOpen] = useState(false);

//   const handleLogout = () => {
//     setConfirmationOpen(true);
//   };

//   const confirmLogout = (confirm) => {
//     if (confirm) {
//       axios.post(logoutRoute)
//         .then(() => {
//           navigate('/login');
//         })
//         .catch((error) => {
//           console.error('Logout failed:', error);
//         });
//     }
//     setConfirmationOpen(false);
//   };

//   const showConfirmation = () => {
//     toast.info(
//       <div>
//         <span>Are you sure you want to logout?</span>
//         <div>
//           <button onClick={() => confirmLogout(true)}>Yes</button>
//           <button onClick={() => confirmLogout(false)}>No</button>
//         </div>
//       </div>,
//       {
//         position: 'top-center',
//         autoClose: false,
//         draggable: true,
//         closeButton: true,
//         closeOnClick: false,
//         onClose: () => {
//           setConfirmationOpen(false);
//         }
//       }
//     );
//   };

//   return (
//     <div>
//       <h1>HomeComponent</h1>
//       <button onClick={handleLogout}>Logout</button>
//       {confirmationOpen && showConfirmation()}
//     </div>
//   );
// };

// export default HomeComponent;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutRoute } from '../routes/apiRoutes';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import verifyToken from '../middlewares/CheckToken';

const HomeComponent = () => {
  const navigate = useNavigate();

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
    // if (verifyToken) {
    console.log("inside of the verify token")
    axios.post(logoutRoute)
      .then(() => {
        localStorage.removeItem('token');
        navigate('/login');
        toast.dismiss();
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
    // }
    // else {
    //   console.log("inside of else of verify token")
    //   console.log("no token found")
    // }

  };
  return (
    <div>
      <h1>HomeComponent</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomeComponent;
