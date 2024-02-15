import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { signUpRoute } from '../routes/apiRoutes'

function Register() {

  const navigate = useNavigate();

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [date_of_birth, setDob] = useState("");
  const [age, setAge] = useState("");
  const [hashedPassword, setHashedPassword] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [phone_no, setPhone_no] = useState("");

  const handleSubmit = async (e) => {
    console.log("handle submit is called.")
    e.preventDefault();

    try {
      console.log("inside of the try block")
      const { data } = await axios.post(signUpRoute, {
        firstName,
        lastName,
        email,
        date_of_birth,
        gender,
        age,
        hashedPassword,
        address,
        zip,
        phone_no
      });
      console.log("data is >>>>", data)

      if (data.statusCode == 200 || data.statusCode == 201) {
        console.log("inside data.status if condition")
        localStorage.setItem("user", JSON.stringify(data.userResponse));
        toast.success(`${data.data.firstName} successfully Registered`);
        // Clear form inputs
        setFirstname("");
        setLastname("");
        setEmail("");
        setDob("");
        setAge("");
        setGender("");
        setHashedPassword("");
        setAddress("");
        setZip("");
        setPhone_no("");
        // navigate("/navbar");
        console.log("form submitted");
      } else {
        console.log("error in else after data.status")
        toast.error(`${data.statusCode} ${data.error}`, { autoClose: 10000 });
      }
    } catch (error) {
      console.log(error.message);
    }
  }


  return (
    <div className='flex items-center justify-center min-h-screen bg-blue-300' >
      <div className='border-2 border-red-300 p-4 '>
        <form onSubmit={(e) => { handleSubmit(e) }} className=' flex flex-col'>
          <input type="text" value={firstName} placeholder='First Name' onChange={(e) => setFirstname(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded' />
          <input type="text" value={lastName} placeholder='Last Name' onChange={(e) => setLastname(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded' />
          <input type="text" value={gender} placeholder='Gender' onChange={(e) => setGender(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded' />
          <input type="email" value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded' />
          <input type="date" value={date_of_birth} placeholder='Date of Birth' onChange={(e) => setDob(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded' />
          <input type="number" value={age} placeholder='Age' onChange={(e) => setAge(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded' />
          <input type="password" value={hashedPassword} placeholder='Password' onChange={(e) => setHashedPassword(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded' />
          <input type="text" value={address} placeholder='Address' onChange={(e) => setAddress(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded' />
          <input type="text" value={zip} placeholder='Zip Code' onChange={(e) => setZip(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded' />
          <input type="text" value={phone_no} placeholder='Phone Number' onChange={(e) => setPhone_no(e.target.value)} className='m-4 p-2 border-2 border-gray-500 rounded' />
          <button type='submit' className='border rounded broder-white text-white bg-red-500 p-2 hover:bg-red-700 cursor-pointer'> Submit</button>
          <p>Already have an Account? <span className='hover:underline'><Link to="/login">Login</Link></span></p>
        </form>
        <ToastContainer />
      </div>
    </div>

  )
}

export default Register
