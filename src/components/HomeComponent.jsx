import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutRoute, getAllUsersRoute, deleteUserRoute } from '../routes/apiRoutes';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import { useAuth } from '../hooks/AuthContext';
import { ToastContainer } from 'react-toastify';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const HomeComponent = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get(getAllUsersRoute)
      .then(response => {
        console.log("response object: ", response.data)
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  const handleLogout = () => {
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
  const handleDeleteUser = (id) => {
    axios.delete(`${deleteUserRoute}?id=${id}`)
      .then(() => {
        toast.success('User deleted successfully');
        fetchUsers();
      })
      .catch(error => {
        console.error('Error deleting user:', error);
        toast.error('Error deleting user');
      });
  };

  return (
    <div>
      <h1>HomeComponent</h1>
      <h2>User List</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ color: "red" }}>First Name</TableCell>
            <TableCell style={{ color: "red" }}>Last Name</TableCell>
            <TableCell style={{ color: "red" }}>Age</TableCell>
            <TableCell style={{ color: "red" }}>Gender</TableCell>
            <TableCell style={{ color: "red" }}>Date Of Birth</TableCell>
            <TableCell style={{ color: "red" }}>Email</TableCell>
            <TableCell style={{ color: "red" }}>Phone Number</TableCell>
            <TableCell style={{ color: "red" }}>Zip</TableCell>
            <TableCell style={{ color: "red" }}>Hashed Password</TableCell>
            <TableCell style={{ color: "red" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.age}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.date_of_birth}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone_no}</TableCell>
              <TableCell>{user.zip}</TableCell>
              <TableCell>{user.hashedPassword}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <button onClick={handleLogout} style={{ margin: "20px" }}>Logout</button>
    </div>
  );
};

export default HomeComponent;
