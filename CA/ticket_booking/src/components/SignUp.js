import '../css-designs/login.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router'


const Signup = () =>  {
  const [data, setData] = useState({
    email: "",
    password: "",
    fullname:"",
    address:""
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
      await axios.post("http://localhost:3000/Signup",data,{ headers } ).then((response) => {
        if(response.status == 200){
          if(response.data!=null){
                console.log(response.status, response.data.token,response);
                window.location.href = "/movies";
          }
        }
       
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div>
      <div className='container'>
        <div className='login form'>
          <header>SignUp Form</header>
        </div>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic"  name= "fullname" label="fullname" variant="outlined"  onChange={handleChange}/>
      <TextField id="outlined-basic" name= "email" label="email" variant="outlined" onChange={handleChange}/>
      <TextField id="filled-basic" name = "password" label="password"  type="password" variant="filled" onChange={handleChange} />
      <TextField id="outlined-basic" name = "address" label="address" variant="outlined" onChange={handleChange}/>
      <Button variant="outlined"><a href='/Login'>Login</a></Button>
      <Button variant="outlined" onClick={handleSubmit}>Sign-up</Button>
    </Box>
         
        </div>
    </div>
  );
}


export default function Comopnent_SignUp() {
  return (<div className="Comopnent_SignUp"> <Signup /> </div>);
}