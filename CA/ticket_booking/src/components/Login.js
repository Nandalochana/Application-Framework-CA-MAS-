import '../css-designs/login.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useState } from "react";
import { useEffect } from 'react';


const Login = () =>  {
  useEffect(() => {
    const email = window.sessionStorage.getItem("email");
    if(email!=null && email.toLowerCase() !=""){
      window.location.href = "/movies";  
    }
  }, [])

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      const headers = {
        "Content-Type": "application/json"
      };
      try {
      await axios.get("http://localhost:3000/Login",{
        params: {
          email: data.email,
          password: data.password
        }
      },{ headers } ).then((response) => {
        if(response.status == 200){
          if(response.data!=null){
              if(response.data.email!=null){
                window.sessionStorage.setItem("email", response.data.email);
                window.sessionStorage.setItem("userType", response.data.userType);
                console.log(response.status, response.data.token,response);
                window.location.href = "/movies"; 
              }
          }
        }
       
      });
    } catch (error) {
      console.log(error);
    }
    };;

  return (
    <div>
      <div className='container'>
        <div className='login form'>
          <header>Login Form</header>
          <Stack
      component="form"
      sx={{
        width: '35ch',
      }}
      spacing={4}
      noValidate
      autoComplete="off"
    >
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        placeholder="Username" name= "email"
        variant="filled" onChange={handleChange}
      />
      <TextField
        hiddenLabel
        id="filled-hidden-label-normal"
                type="password" name= "password"
                placeholder="password" onChange={handleChange}
        variant="filled"
      />
      <Button variant="outlined"  onClick={handleSubmit}>Log In</Button>
      <Button variant="outlined"><a href='/signup'>Sign-up</a></Button>
    </Stack>
        </div>
        </div>
    </div>
  );
}


export default function Comopnent_Login() {
  return (<div className="Comopnent_Login"> <Login /> </div>);
}