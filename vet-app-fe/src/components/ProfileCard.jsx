import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";


export default function ProfileCard(props) {

// passing the prop.id to set state initially
const [id, setId] = useState(props.id);

// setting this to onClick for the child component
function displayOnView(event) {
  handleButtonClick()
  event.preventDefault();
  props.sendAnimal({id}) //future declaration of sending the data via function
}

//updates the prop id of the animal being clicked on
const handleButtonClick = () =>{
  setId(props.id)
}

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <CardMedia
              component="img"
              alt="animals"
              height="190"
              image={props.img}
            />
            <Typography variant="h5" component="div">
              {props.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {props.tattooNum}
            </Typography>
            <Typography variant="body2">{props.breed}</Typography>
          </CardContent>
          <CardActions>
            <Button 
            size="small" 
            onClick = {displayOnView}
            >
              View Profile
            </Button>
          </CardActions>
    </React.Fragment>
      </Card>
    </Box>
  );
}
