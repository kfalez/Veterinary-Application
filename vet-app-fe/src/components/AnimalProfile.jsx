import React from "react";
import { Box, Stack } from "@mui/material";
import { SERVER_URL } from "../constants.js";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Combined from "./Combined";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import UpdateStatusButton from "./UpdateStatusButton"; 
import RequestTreatmentButton from "./RequestTreatmentButton.jsx";
import RequestInstructionButton from "./RequestInstructionButton.jsx";
import auth from "../authentication/AuthenticationService";
import authToken from "../authentication/DataService";


export default function AnimalProfile() {
  const [animal, setAnimal] = useState([]);
  const location = useLocation();
  const [status, setStatus] = useState([]);

  const [currentUser, setCurrentUser] = useState(undefined);
  const [showStatus, setShowStatus] = useState(false);
  const [showUpdateButton, setUpdateButton] = useState(false);
  const [displayInstructionButton, setDisplayInstructionButton] = useState(false);
  const [displayTreatmentButton, setDisplayTreatmentButton] = useState(false);

  function hasPhoto(data) {
    return data.animalPhoto.length === 0 ? false : true;
  }

  useEffect(() => {
    let imagePath = "";
    let tempID;

    if (location.state.id === undefined) {
      if (location.state.id === undefined) {
        tempID = location.state.animalId;
      } else {
        tempID = location.state;
      }
    } else {
      tempID = location.state.id;
    }

    fetch(SERVER_URL + "animals/" + tempID, {headers: authToken()})
      .then((response) => response.json())
      .then((data) => {
        hasPhoto(data)
          ? (imagePath = `${data.animalPhoto[0].theFile}`)
          : (imagePath = `animals.jpg`);
        localStorage.setItem(
          `animalPhoto`,
          imagePath
        );
        setAnimal(data);
        setStatus(data.animalStatus)
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const user = auth.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      if (
        user.roles.includes("ROLE_ADMIN") === true ||
        user.roles.includes("ROLE_ANIMAL_HEALTH_TECHNICIAN") === true ||
        user.roles.includes("ROLE_ANIMAL_CARE_ATTENDANT") === true
      ) {
        setShowStatus(true);
      }
      if (
        user.roles.includes("ROLE_ANIMAL_HEALTH_TECHNICIAN") === true ||
        user.roles.includes("ROLE_ANIMAL_CARE_ATTENDANT") ===true
      ) {
        setUpdateButton(true);
      }
      if (
        user.roles.includes("ROLE_TEACHING_TECHNICIAN") === true
      ) {
        setDisplayInstructionButton(true);
      }
      if (
        user.roles.includes("ROLE_ANIMAL_CARE_ATTENDANT") === true
      ) {
        setDisplayTreatmentButton(true);
      }
    }
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Avatar
            alt="animal image"
            src={`/images/${localStorage.getItem("animalPhoto")}`}
            sx={{ width: 90, height: 90 }}
          />
          <Stack spacing={0.1}>
            <Typography variant="h4" component="div">
              {animal.animalName}
            </Typography>
            {(showStatus &&
              <Stack spacing={0.05}>
              {!status ? 
                (<Typography variant="subtitle2" component="div">
                  Status: N/A 
                </Typography>) :
                (<Typography variant="subtitle2" component="div">
                {`Status: ${status.theStatus}`} 
              </Typography>)
              }
              {!status ? 
                (<Typography variant="subtitle2" component="div">
                  Location: N/A 
                </Typography>) :
                (<Typography variant="subtitle2" component="div">
                {`Location: ${status.location}`} 
              </Typography>)
              }
            </Stack>)}
          </Stack>
        </Stack>
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1, m: 1 }}>
          {showUpdateButton && (<UpdateStatusButton animal={animal}/>)}
          {displayTreatmentButton && (<RequestTreatmentButton animal = {animal}/>)}
          {displayInstructionButton && (<RequestInstructionButton animal = {animal}/>)}
        </Box>
      </Box>
      <Combined animal={animal} />
    </div>
  );
}
