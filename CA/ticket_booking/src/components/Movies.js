import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useState } from "react";
import { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import Tooltip from '@mui/material/Tooltip';
import { Hidden } from '@mui/material';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const Movie_Filter = () => {
  var userId = window.sessionStorage.getItem("userId");
  const [filterValuesForGrid, setfilterValuesForGrid] = useState({
    myId: "",
    movieName: "",
    date: "",
    time: "",
    location: "",
    maxcount: "",
    price: "",
    img: "",
    userId: userId
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setfilterValuesForGrid({
      ...filterValuesForGrid,
      [e.target.name]: value
    });
  };

  const [data, setData] = useState({
    myId: "",
    _id: "",
    movieName: "",
    date: "",
    time: "",
    location: "",
    maxcount: "",
    price: "",
    img: "",
    color: "",
    visible:""
  });

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    movieLoad();
  }, [])

  async function movieLoad() {
    const headers = {
      "Content-Type": "application/json"
    };

    try {
      await axios.post("http://localhost:3000/MovieFilter", filterValuesForGrid, { headers }).then((response) => {
        if (response.status == 200) {
          if (response.data != null) {
            console.log(response.data);
            setData(response.data);
            setIsLoading(false);
          }
        }

      });

    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);

    }
  };


  async function logOut() {
    window.sessionStorage.removeItem("email");
    window.sessionStorage.removeItem("userType");
    window.sessionStorage.removeItem("userId");
    window.location.href = "/login";
  };

  async function whishlistAdjust(movieId) {
    const headers = {
      "Content-Type": "application/json"
    };

    const body = {
      movieId,
      userId
    };

    try {
      const response = await axios.post("http://localhost:3000/whishlistAdjust", body, { headers });
      if (response.status === 200) {
        console.log("Wishlist adjusted successfully");
        movieLoad()
      }
    } catch (error) {
      console.error('Error adjusting wishlist:', error);
    }
  }

  const SearchComponent = () => {
    return (
      <div>
        <div className='search-container'>
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
                value={filterValuesForGrid.movieName || ""}
                placeholder="movieName" onChange={handleChange}
              />

              <TextField
                name="date"
                id="date"
                value={filterValuesForGrid.date || ""}
                type='date'
                placeholder="Date" onChange={handleChange}
              />

              <TextField
                name="time"
                id="time"
                value={filterValuesForGrid.time || ""}
                type='time'
                onChange={handleChange}
              />

              <TextField
                name="location"
                id="location"
                label="location"
                value={filterValuesForGrid.location || ""}
                onChange={handleChange}
              />

              <TextField
                name="maxcount"
                id="maxcount"
                label="maxcount"
                type='number'
                value={filterValuesForGrid.maxcount || ""}
                placeholder="Max-Count" onChange={handleChange}
              />

              <TextField
                name="price"
                id="price"
                label="price"
                type='number'
                value={filterValuesForGrid.price || ""}
                placeholder="Ticket-Price" onChange={handleChange}
              />

              <Stack direction="row" spacing={4}>
                <Button variant="outlined" onClick={movieLoad} >Seach</Button>
                <Button variant="outlined" onClick={logOut} >Log-Out</Button>
                <Button variant="outlined" href='/history' >Booking History</Button>
              </Stack>

            </div>
          </Box>
        </div>
      </div>

    );
  }


  const renderComponent = () => {
    return data.map((item, index) => (
      <MyRepeatedComponent key={index} item={item} whishlistAdjust={whishlistAdjust}/>
    ));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SearchComponent />
      {renderComponent()}
    </div>
  );

}


const MyRepeatedComponent = ({ item, whishlistAdjust  }) => {
  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <a href={'/movieinfo?id=' + item._id}>
              <Img alt="complex" src={item.img} />
            </a>
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>

            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {item.movieName}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {item.date}- {item.time}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.location}
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                <a href={'/movieinfo?id=' + item._id}>See Info</a>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              ${item.price}
            </Typography>
            <Typography variant="subtitle1" component="div">
              Avaiable Count - {item.maxcount}
            </Typography>
          </Grid>
        </Grid>
        <div>
        <Grid item>
          <Tooltip title=" Wishlist">
            <div style={{ display: item.visible }}>
              <HomeIcon color={item.color} onClick={() => whishlistAdjust(item._id)} />
            </div>
          </Tooltip>
        </Grid>
      </div>
      </Grid>
    </Paper>

  );
};




export default function Comopnent_Movies() {
  return (<div className="Comopnent_Movies"> <Movie_Filter /> </div>);
}