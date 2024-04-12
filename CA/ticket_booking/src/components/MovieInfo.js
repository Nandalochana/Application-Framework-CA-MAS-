import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CenterFocusStrong } from '@mui/icons-material';

 function MovieInfo() {
  return (
    <div className='container'>
 <Card sx={{ maxWidth: 500, alignSelf:'center' }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="200"
        style={{ alignSelf: 'center' }}
        width={750}
        image="https://spotlightonline.co/wp-content/uploads/2017/03/cinema_projector-1024x683.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          MovieName Comes Here
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"><a href='/history'>Book ticket</a></Button>
        <Button size="small"><a href='/admin'>Show Aditional Info</a></Button>
      </CardActions>
    </Card>
      </div>
  );
}


export default function Comopnent_MovieInfo() {
  return (<div className="Comopnent_MovieInfo"> <MovieInfo /> </div>);
}