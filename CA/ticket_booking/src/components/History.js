import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { useEffect } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function createData(_id, movieName, date, time, location, ticketprice, ticketcount) {
  return { _id, movieName, date, time, location, ticketprice, ticketcount };
}

const MovieHistory = () => {
  const [rows, setrowsData] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const useremail = window.sessionStorage.getItem("email");
  const userId = window.sessionStorage.getItem("userId");
  useEffect(() => {
    if (useremail == null || userId == null) {
      window.location.href = "/login";
    }
    else { movieLoad(); }
  }, [])


  async function movieLoad() {
    const headers = {
      "Content-Type": "application/json"
    };

    try {
      await axios.get("http://localhost:3000/UserHistoryLoad", {
        params: {
          id: userId,

        }
      }, { headers }).then((response) => {
        if (response.status == 200) {
          if (response.data != null) {
            setrowsData(response.data);
            setIsLoading(false);
          }
        }

      });

    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  }


  const deleteBookingRecord = async (id) => {
    const headers = {
      "Content-Type": "application/json"
    };

    try {
      await axios.get("http://localhost:3000/UserHistoryDelete", {
        params: {
          id: id,

        }
      }, { headers }).then((response) => {
        if (response.status == 200) {
          if (response.data != null) {
            movieLoad()
          }
        }

      });

    } catch (error) {
      console.error('Error fetching data:', error);

    }
  };

  return (
    <div className='table'>
      <TableContainer component={Paper} style={{ alignSelf: 'center', margin: '10' }}>
        <Table sx={{ minWidth: 800, alignSelf: 'center', margin: '10' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Movie Name</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center"> Location </TableCell>
              <TableCell align="center"> TicketPrice </TableCell>
              <TableCell align="center">Ticket-Count</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.movieName}
                </TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.time}</TableCell>
                <TableCell align="center">{row.location}</TableCell>
                <TableCell align="center">{row.ticketprice}</TableCell>
                <TableCell align="center">{row.ticketcount}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined" onClick={() => deleteBookingRecord(row._id)}>Delete</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default function Comopnent_History() {
  return (<div className="Comopnent_History"> <MovieHistory /> </div>);
}