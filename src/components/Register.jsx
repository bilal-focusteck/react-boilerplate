import * as React from 'react';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUpRoute } from '../routes/apiRoutes';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  date_of_birth: Yup.date().required('Date of Birth is required'),
  gender: Yup.string().required('Gender is required'),
  age: Yup.number().required('Age is required'),
  hashedPassword: Yup.string().required('Password is required'),
  address: Yup.string().required('Address is required'),
  zip: Yup.string().required('Zip Code is required'),
  phone_no: Yup.string().required('Phone Number is required'),
});

export default function SignUp() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      date_of_birth: '',
      gender: '',
      age: '',
      hashedPassword: '',
      address: '',
      zip: '',
      phone_no: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(signUpRoute, {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          date_of_birth: values.date_of_birth,
          gender: values.gender,
          age: values.age,
          hashedPassword: values.hashedPassword,
          address: values.address,
          zip: values.zip,
          phone_no: values.phone_no,
        });

        if (data.statusCode === 200 || data.statusCode === 201) {
          toast.success(`${data.data.firstName} successfully Registered`, { autoClose: 3000 });
          setTimeout(() => {
            formik.resetForm();
          }, 1000);

          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          toast.error(`${data.statusCode} ${data.error}`, { autoClose: 3000 });
        }
      } catch (error) {
        toast.error(`error found while signing up ${error.message}`, { autoClose: 3000 });
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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
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
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
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
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
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
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="date_of_birth"
                  // label="Date of Birth"
                  type="date"
                  name="date_of_birth"
                  value={formik.values.date_of_birth}
                  onChange={formik.handleChange}
                  error={formik.touched.date_of_birth && Boolean(formik.errors.date_of_birth)}
                  helperText={formik.touched.date_of_birth && formik.errors.date_of_birth}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="gender"
                  label="Gender"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  helperText={formik.touched.gender && formik.errors.gender}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="hashedPassword"
                  label="Password"
                  type="password"
                  name="hashedPassword"
                  autoComplete="new-password"
                  value={formik.values.hashedPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.hashedPassword && Boolean(formik.errors.hashedPassword)}
                  helperText={formik.touched.hashedPassword && formik.errors.hashedPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  type="number"
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  error={formik.touched.age && Boolean(formik.errors.age)}
                  helperText={formik.touched.age && formik.errors.age}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="zip"
                  label="Zip Code"
                  name="zip"
                  value={formik.values.zip}
                  onChange={formik.handleChange}
                  error={formik.touched.zip && Boolean(formik.errors.zip)}
                  helperText={formik.touched.zip && formik.errors.zip}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone_no"
                  label="Phone Number"
                  name="phone_no"
                  value={formik.values.phone_no}
                  onChange={formik.handleChange}
                  error={formik.touched.phone_no && Boolean(formik.errors.phone_no)}
                  helperText={formik.touched.phone_no && formik.errors.phone_no}
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
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
}
