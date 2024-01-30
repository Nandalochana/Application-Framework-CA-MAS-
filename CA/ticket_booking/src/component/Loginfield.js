import '../App.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';

function LoginData() {
   const sendRequest= async ()=>{
    const headers = {
      "Content-Type": "application/json"
    };
    const url = "http://localhost:3000/Login";
  
    axios.get(url, { headers });
    }


    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
        <Grid item xs={10}>
        <TextField id="email" label="Email" variant="outlined" />
        <TextField id="pw" label="Password" variant="outlined" />
        <Button 
          onClick={sendRequest}
          variant="contained">Send Request</Button>
        </Grid>
  
    </Box>
      </>
    );
  }


export default function App(){
return(<div className="App"> <LoginData/> </div>);
}