import '../css-designs/login.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import axios from 'axios';
import { useNavigate } from 'react-router'

function Signup() {
  const navigate = useNavigate()
  navigate(0)
  const sendRequest = async () => {
    const headers = {
      "Content-Type": "application/json"
    };
    const url = "http://localhost:3000/SignUp";

    axios.get(url, { headers });
  }

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
      <TextField id="outlined-basic" label="Full Name" variant="outlined" />
      <TextField id="outlined-basic" label="Email" variant="outlined" />
      <TextField id="filled-basic" label="Password"  type="password" variant="filled" />
      <TextField id="outlined-basic" label="Address" variant="outlined" />
      <Button variant="outlined"><a href='/Login'>Login</a></Button>
      <Button variant="outlined">Sign-up</Button>
    </Box>
         
        </div>
    </div>
  );
}


export default function Comopnent_SignUp() {
  return (<div className="Comopnent_SignUp"> <Signup /> </div>);
}