import '../css-designs/login.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
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
        placeholder="Username"
        variant="filled"
      />
      <TextField
        hiddenLabel
        id="filled-hidden-label-normal"
                type="password"
                placeholder="password"
        variant="filled"
      />
      <Button variant="outlined" onClick={sendRequest}>Log In</Button>
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