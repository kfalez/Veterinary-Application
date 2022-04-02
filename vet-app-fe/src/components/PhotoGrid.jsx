import React, { useEffect, useState } from "react";
import PhotoCard from "./PhotoCard";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import UploadImageButton from "./UploadImageButton";
import auth from "../authentication/AuthenticationService";

export default function PhotoGrid(props) {

  const [currentUser, setCurrentUser] = useState(undefined);
  const [showUploadButton, setShowUploadButton] = useState(false);

  useEffect(() => {
    const user = auth.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      if (
        user.roles.includes("ROLE_ANIMAL_CARE_ATTENDANT") === true
      ) {
        setShowUploadButton(true);
      }
    }
  }, []);
 
  console.log(props.animal);
  return (
    <Container sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1, m: 1 }}>
        {showUploadButton && (<UploadImageButton animal = {props.animal}/>)}
      </Box>
      <Grid container spacing={4}>
        {(props.animal.animalPhoto || []).map(p => {
          return (
            <Grid Grid item xs={12} sm={6} md={4}>
              <PhotoCard 
                creationDate = {p.creationDate}
                theFile = {p.theFile}
                theType = {p.theType}
              />
            </Grid>
          );
        })
      }
      </Grid>
    </Container>
  );
}
<Grid Grid item xs={12} sm={6} md={4}>
  <PhotoCard />
</Grid>