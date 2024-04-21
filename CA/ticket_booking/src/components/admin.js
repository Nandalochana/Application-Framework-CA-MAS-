import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { Hidden, Stack } from '@mui/material';
import { Visibility } from '@mui/icons-material';

//const rows =[];
//const rows = [
// { id:10, movieName: "100", date: 'Snow', time: 'Jon', location: 35, maxcount:"10"},
//];


const MovieAdmin = () => {

  const columns = [
    { field: '_id', headerName: 'ID', width: 130,  hide: true, columnVisibilityModel: {
      // Hide columns status and traderName, the other columns will remain visible
      status: false,
      traderName: false,
      hide: true
    }, },
    { field: 'movieName', headerName: 'Movie Name', width: 150 },
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'time', headerName: 'Time', width: 130 },
    { field: 'maxcount', headerName: 'Max-Count', width: 100 },
    { field: 'location', headerName: 'Location', width: 100 },
    {
      field: 'action',
      headerName: 'Action',
      width: 250,
      sortable: false,
      disableClickEventBubbling: true,

      renderCell: (params) => {
        const onDelete = async (e) => {
          const currentRow = params.row;
          try {
            const params = { id: currentRow._id };
            await axios.delete("http://localhost:3000/MovieDelete", { params }).then((response) => {
              if (response.status == 200) {
                if (response.data != null) {
                  movieLoad();

                }
              }

            });
          } catch (error) {
            console.log(error);
          }

        };

        const onUpdate = async (e) => {
          const currentRow = params.row;
          console.log(currentRow.id)
          try {
            setData({
              ...data,
              myId: currentRow._id,
              movieName: currentRow.movieName,
              date: currentRow.date,
              time: currentRow.time,
              location: currentRow.location,
              maxcount: currentRow.maxcount
            });


          } catch (error) {
            console.log(error);
          }

        };

        return (
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" color="error" size="small" onClick={onUpdate}>Mark</Button>
            <Button variant="outlined" color="error" size="small" onClick={onDelete}>Delete</Button>
          </Stack>
        );
      },
    },
   
  ];

  useEffect(() => {
    movieLoad();
  }, [])

  const [loadInfo, setInfo] = useState({
    myId: "",
    movieName: "",
    date: "",
    time: "",
    location: "",
    maxcount: ""
  });


  const [tableData, setTableData] = useState([])


  const [data, setData] = useState({
    myId: "",
    movieName: "",
    date: "",
    time: "",
    location: "",
    maxcount: ""
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
      await axios.post("http://localhost:3000/MovieAdd", data, { headers }).then((response) => {
        if (response.status == 200) {
          if (response.data != null) {
            //console.log(response.status, response.data.token,response);
            setData({
              ...data,
              myId: "",
              movieName: "",
              date: "",
              time: "",
              location: "",
              maxcount: ""
            });
            setTableData(response.data);

          }
        }

      });
    } catch (error) {
      console.log(error);
    }
  };


  async function movieLoad() {
    const headers = {
      "Content-Type": "application/json"
    };

    try {
      await axios.post("http://localhost:3000/MovieLoad", loadInfo, { headers }).then((response) => {
        if (response.status == 200) {
          if (response.data != null) {
            //console.log(response.data);
            setTableData(response.data);
          }
        }

      });

    } catch (error) {
      console.log(error);
    }
  };



  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json"
    };

    try {
      console.log(data)
      await axios.put("http://localhost:3000/MovieUpdate", data, { headers }).then((response) => {
        if (response.status == 200) {
          if (response.data != null) {
            //console.log(response.status, response.data.token,response);
            setData({
              ...data,
              myId: "",
              movieName: "",
              date: "",
              time: "",
              location: "",
              maxcount: ""
            });
            setTableData(response.data);

          }
        }

      });
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
      <div className='table'>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>

            <TextField
              name="movieName"
              id="moviename"
              label="movieName"
              value={data.movieName || ""}
              placeholder="movieName" onChange={handleChange}
            />

            <TextField
              name="date"
              id="date"
              value={data.date || ""}
              type='date'
              placeholder="Date" onChange={handleChange}
            />

            <TextField
              name="time"
              id="time"
              value={data.time || ""}
              type='time'
              onChange={handleChange}
            />

            <TextField
              name="location"
              id="location"
              label="location"
              value={data.location || ""}
              onChange={handleChange}
            />

            <TextField
              name="maxcount"
              id="maxcount"
              label="maxcount"
              type='number'
              value={data.maxcount || ""}
              placeholder="Max-Count" onChange={handleChange}
            />
            <Stack direction="row" spacing={4}>
              <Button variant="outlined" onClick={handleSubmit} >Register a Movie</Button>
              <Button variant="outlined" onClick={handleSubmitUpdate} >Update Movie Info</Button>
            </Stack>

          </div>
        </Box>

        <div style={{ height: 500, width: '100%' }}>
          <DataGrid
            rows={tableData}
            getRowId={() => uuidv4()}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}

          />
        </div>
      </div>
    </div>

  );
}

export default function Comopnent_Admin() {
  return (<div className="Comopnent_Admin">

    <MovieAdmin />
  </div>);
}