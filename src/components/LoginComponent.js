import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../routes/apiRoutes';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../hooks/AuthContext';

const defaultTheme = createTheme();

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  hashedPassword: Yup.string().required('Password is required'),
});

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      hashedPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log("values got: ", values);
      try {
        const { data } = await axios.post(loginRoute, {
          email: values.email,
          hashedPassword: values.hashedPassword,
        });
        console.log("data from form: ", data)

        if (data.statusCode === 200 || data.statusCode === 201) {
          console.log("data.token value is: ", data.token);
          localStorage.setItem('token', data.token);
          login();
          toast.success(`Logged in successfully`, { autoClose: 3000 });
          console.log("login state: ", login)
          setTimeout(() => {
            navigate('/');
          }, 3000);
        } else {
          toast.error(`${data.statusCode} ${data.error}`, { autoClose: 3000 });
        }
      } catch (error) {
        toast.error(`Error found while logging in: ${error.message}`, { autoClose: 3000 });
      }
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <div>
            <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
              Sign in
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="hashedPassword"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.hashedPassword}
                onChange={formik.handleChange}
                error={formik.touched.hashedPassword && Boolean(formik.errors.hashedPassword)}
                helperText={formik.touched.hashedPassword && formik.errors.hashedPassword}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <ToastContainer
                position="top-right"
              />
              {/* Same as */}
              <ToastContainer />
              <Grid container justifyContent={'flex-end'}>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <ToastContainer />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
