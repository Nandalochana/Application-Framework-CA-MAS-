import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from "react";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { Stack } from '@mui/material';

const UserManagement = () => {

  useEffect(() => {
    const userLevel = window.sessionStorage.getItem("userType");
    if(userLevel !=1){
      window.location.href = "/movies";  
    }
  }, [])


  const columns = [
    { field: '_id', headerName: 'ID', width: 130,  hide: true, columnVisibilityModel: {
      status: false,
      traderName: false,
      hide: true
    }, },
    { field: 'fullName', headerName: 'FullName', width: 150 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'password', headerName: 'Password', width: 130 },
    { field: 'address', headerName: 'address', width: 100 },
    { field: 'userType', headerName: 'userType', width: 100 },
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
            await axios.delete("http://localhost:3000/UserDelete", { params }).then((response) => {
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
              fullName: currentRow.fullName,
              email: currentRow.email,
              password: currentRow.password,
              address: currentRow.address,
              userType:currentRow.userType
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
    fullName: "",
    email: "",
    password: "",
    address: "",
    userType:""
  });


  const [tableData, setTableData] = useState([])


  const [data, setData] = useState({
    myId: "",
    fullName: "",
    email: "",
    password: "",
    address: "",
    userType:""
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
      await axios.post("http://localhost:3000/UserAdd", data, { headers }).then((response) => {
        if (response.status == 200) {
          if (response.data != null) {
            //console.log(response.status, response.data.token,response);
            setData({
              ...data,
              myId: "",
              fullName: "",
              email: "",
              password: "",
              address: "",
              userType:""
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
      await axios.post("http://localhost:3000/UserLoad", loadInfo, { headers }).then((response) => {
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
      await axios.put("http://localhost:3000/UserUpdate", data, { headers }).then((response) => {
        if (response.status == 200) {
          if (response.data != null) {
            //console.log(response.status, response.data.token,response);
            setData({
              ...data,
              myId: "",
              fullName: "",
              email: "",
              password: "",
              address: "",
              userType:""
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
              name="fullName"
              id="fullName"
              label="fullName"
              value={data.fullName || ""}
              placeholder="fullName" onChange={handleChange}
            />

            <TextField
              name="email"
              id="email"
              value={data.email || ""}
              type='email'
              placeholder="email" onChange={handleChange}
            />

            <TextField
              name="password"
              id="password"
              value={data.password || ""}
              type='password'
              onChange={handleChange}
            />

            <TextField
              name="address"
              id="address"
              label="address"
              value={data.address || ""}
              onChange={handleChange}
            />
            <TextField
              name="userType"
              id="userType"
              value={data.userType || ""}
              type='number'
              placeholder="userType" onChange={handleChange}
            />

            <Stack direction="row" spacing={4}>
              <Button variant="outlined" onClick={handleSubmit} >Register a User</Button>
              <Button variant="outlined" onClick={handleSubmitUpdate} >Update User Info</Button>
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

export default function Comopnent_UserManagement() {
  return (<div className="Comopnent_UserManagement">

    <UserManagement />
  </div>);
}