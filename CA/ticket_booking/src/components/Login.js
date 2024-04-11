import '../css-designs/login.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import SignUp from "./SignUp";
import { CenterFocusStrong } from '@mui/icons-material';

function Login() {
  const sendRequest = async () => {
    const headers = {
      "Content-Type": "application/json"
    };
    const url = "http://localhost:3000/Login";

    axios.get(url, { headers });
  }
  return (
    <div>
      <div className='container'>
        <div className='login form'>
          <header>Login Form</header>
        </div>
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="UserName" variant="outlined" />
      <TextField id="outlined-basic" label="Password" variant="filled" />
      
    </Box>
         
        </div>
    </div>
  );
}


export default function Comopnent_Login() {
  return (<div className="Comopnent_Login"> <Login /> </div>);
}