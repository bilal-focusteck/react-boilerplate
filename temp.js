// import React, { useState, useEffect } from 'react'
// import axios from "axios"
// import { useNavigate, Link } from "react-router-dom"
// import { toast, ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import { signUpRoute } from '../routes/apiRoutes'

// function Register() {

//   const navigate = useNavigate();

//   const [name, setName] = useState("")
//   const [username, setUsername] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")


//   useEffect(() => {
//     if (localStorage.getItem("user")) {
//       navigate("/user")
//     }
//   }, [])

//   const handleValidation = () => {

//     if (password !== confirmPassword) {
//       (function notify() {
//         toast.error("password and confirm password should be same", { position: "bottom-right" })
//       })();
//       return false
//     } else if (username.length < 3) {
//       (function notify() {
//         toast.error("username should be greater than 3 character", { position: "bottom-right" })
//       })();
//       return false
//     } else if (password < 3) {
//       (function notify() {
//         toast.error("password should be atleast 8 character", { position: "bottom-right" })
//       })();
//       return false
//     } else if (email === "") {
//       (function notify() {
//         toast.error("emial is required", { position: "bottom-right" })
//       })();
//       return false
//     }
//     return true
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (handleValidation()) {
//       try {
//         const { data } = await axios.post(signUpRoute, {
//           username, email, password
//         });

//         if (data.status) {
//           localStorage.setItem("user", JSON.stringify(data.userResponse));

//           (function notify() {
//             toast.success(`${data.userResponse.username} successfully Registered`)
//           })();

//           setName("")
//           setEmail("")
//           setPassword("")
//           setUsername("")
//           setConfirmPassword("")
//           navigate("/")
//         } else {
//           (function notify() {
//             toast.error(`${data.message} `, { autoClose: 3000 })
//           })()
//         }
//       } catch (error) {
//         console.log(error.message);
//       }
//     }
//   }


//   return (
//     <div className='flex items-center justify-center min-h-screen bg-blue-300' >
//       <div className='border-2 border-red-300 p-4 '>
//         <form onSubmit={(e) => { handleSubmit(e) }} className=' flex flex-col'>
//           <input type="text" value={name} placeholder='name' onChange={(e) => setName(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded' />
//           <input type="text" value={username} placeholder='username' onChange={(e) => setUsername(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded' />
//           <input type="email" value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded' />
//           <input type="password" value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded' />
//           <input type="password" value={confirmPassword} placeholder='confirm password' onChange={(e) => setConfirmPassword(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded' />
//           <input type='submit' className='border rounded broder-white text-white bg-red-500 p-2 hover:bg-red-700 cursor-pointer' />
//           <p>Alreadu have an Account?<span className='hover:underline'><Link to="/login">Login</Link></span></p>
//         </form>
//         <ToastContainer />
//       </div>
//     </div>

//   )
// }

// export default Register

import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { checkDataFormat } from "../middlewares/CheckCredentials";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    checkErrors(data);
    if (!errors.email && !errors.password && !errors.firstName && !errors.lastName) {
      //todo - API for signup
      navigate('/dashboard');
    }

  };

  const checkErrors = (data) => {
    const email = data.get("email");
    const password = data.get("password");
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");

    setErrors({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    });

    const validInfo = checkDataFormat(email, password);

    if (validInfo.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: validInfo.msg }));
    }

    if (validInfo.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: validInfo.msg }));
    }

    if (!firstName.length) {
      setErrors((prevErrors) => ({ ...prevErrors, firstName: 'Please enter first name' }));
    }

    if (!lastName.length) {
      setErrors((prevErrors) => ({ ...prevErrors, lastName: 'Please enter last name' }));
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign Up / Register
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
