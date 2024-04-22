import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import axios from 'axios';
import { useState } from "react";
import TextField from '@mui/material/TextField';


function MovieInfo(props) {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get('id');
  const useremail = window.sessionStorage.getItem("email");
  const userId = window.sessionStorage.getItem("userId");
  useEffect(() => {
    if (useremail == null) {
      window.location.href = "/login";
    }
    else { movieLoad(); }
  }, [])

  const [data, setData] = useState({
    _id: "",
    movieName: "",
    date: "",
    time: "",
    location: "",
    maxcount: "",
    price: "",
    img: "",
    info: ""
  });

  const [isLoading, setIsLoading] = useState(true);

  async function movieLoad() {
    const headers = {
      "Content-Type": "application/json"
    };

    try {
      await axios.get("http://localhost:3000/MovieInfoLoad", {
        params: {
          id: id,

        }
      }, { headers }).then((response) => {
        if (response.status == 200) {
          if (response.data != null) {
            setData(response.data);
            setIsLoading(false);
          }
        }

      });

    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);

    }
  }

  const [bookingData, setbookingData] = useState({
    movieId: id,
    userId: userId,
    email: useremail,
    count: 0
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setbookingData({
      ...bookingData,
      [e.target.name]: value
    });
  };

  async function bookTickets() {
    const headers = {
      "Content-Type": "application/json"
    };

    try {
      console.log(bookingData)
      await axios.post("http://localhost:3000/BookTickets", bookingData, { headers }).then((response) => {
        if (response.status == 200) {
          if (response.data != null) {
            setData(response.data);
            setbookingData({
              ...bookingData,
              count: 0,
            });
            setIsLoading(false);
          }
        }

      });

    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);

    }
  };


  return (
    <div className='container'>
      <Card sx={{ maxWidth: 500, alignSelf: 'center' }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="200"
          style={{ alignSelf: 'center' }}
          width={750}
          image={data.img}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data.movieName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.info}
          </Typography>
          <Typography variant="body3" color="text.secondary">
            Ticket Price $- {data.price}
            <br />
          </Typography>
          <Typography variant="body4" color="text.secondary">
            Avaiable Count - {data.maxcount}
            <br />
          </Typography>
          {data.location} - {data.time}
          <br />

        </CardContent>
        <CardActions>
          < TextField
            name="count"
            id="count"
            label="count"
            type='number'
            placeholder="Book ticket Count"
            value={bookingData.count || ""}
            onChange={handleChange}
          />
          <Button size="small" onClick={bookTickets} >Book ticket</Button>
          <Button size="small"><a href='/movies'>Show Other Movies</a></Button>
        </CardActions>
      </Card>
    </div>
  );
}


export default function Comopnent_MovieInfo() {
  return (<div className="Comopnent_MovieInfo"> <MovieInfo /> </div>);
}