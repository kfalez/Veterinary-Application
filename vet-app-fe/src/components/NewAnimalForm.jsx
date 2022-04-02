import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom";

export default function NewUserForm(props) {
  const [values, setValues] = React.useState({
    animalName: "",
    species: "",
    weight: "",
    tattoo: "",
    breed: "",
    sex: "",
  });

  const [animalName, setAnimalName] = useState("");
  const [species, setSpecies] = useState("");
  const [weight, setWeight] = useState("");
  const [tattoo, setTattoo] = useState("");
  const [breed, setBreed] = useState("");
  const [sex, setSex] = useState("");

  const handleAnimalNameInput = (event) => {
    setAnimalName(event.target.value);
  };
  const handleSpeciesInput = (event) => {
    setSpecies(event.target.value);
  };

  const handleWeightInput = (event) => {
    setWeight(event.target.value);
  };

  const handleTattooInput = (event) => {
    setTattoo(event.target.value);
  };

  const handleBreedInput = (event) => {
    setBreed(event.target.value);
  };

  const handleSexInput = (event) => {
    setSex(event.target.value);
  };

  function newAnimalSubmit(event) {
    event.preventDefault();

    props.onNewAnimalSubmit({ species, weight, tattoo, breed, sex, animalName });
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Grid
          sx={{ p: 4 }}
          item
          style={{ marginRight: "auto" }}
        >
          <Stack spacing={3}>
            <Grid item>
              <Typography variant="h4" color="primary">
                Create New Animal
              </Typography>
            </Grid>

            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-animalName">
                Name
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-animalName"
                onChange={handleAnimalNameInput}
                label="animalName"
                placeholder="Enter Animal Name"
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "40ch" }}>
              <InputLabel id="demo-simple-select-label">Animal Species</InputLabel>
              <Select
                labelId="species-label"
                id="species"
                label="Species"
                onChange={handleSpeciesInput}
                placeholder="Select Species"
              >
                <MenuItem value={"Cat"}>Cat</MenuItem>
                <MenuItem value={"Dog"}>Dog</MenuItem>
                <MenuItem value={"Horse"}>Horse</MenuItem>
                <MenuItem value={"Chicken"}>Chicken</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-attribute">
                Weight
              </InputLabel>
              <OutlinedInput
                id="weight"
                onChange={handleWeightInput}
                label="Weight"
                placeholder="Enter Weight"
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-tattoo">
                Tattoo Number
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-tatto"
                onChange={handleTattooInput}
                label="Tattoo"
                placeholder="Enter Tattoo"
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-tattoo">
                Breed
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-tatto"
                onChange={handleBreedInput}
                label="Breed"
                placeholder="Enter Breed"
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "40ch" }}>
              <InputLabel id="demo-simple-select-label">Sex</InputLabel>
              <Select
                labelId="sex-label"
                id="sex"
                label="sex"
                onChange={handleSexInput}
                placeholder="Select sex"
              >
                <MenuItem value={"M"}>M</MenuItem>
                <MenuItem value={"F"}>F</MenuItem>
              </Select>
            </FormControl>

            <Button onClick = {newAnimalSubmit}
            variant="contained" color="success" sx={{ m: 1,width: "41ch" }}>
              Add New Animal
            </Button>
            <Button component = {Link} to = "/welcome"
            variant="contained" color="error" sx={{ m: 1, width: "41ch"}}>
              Cancel
            </Button>
          </Stack>
        </Grid>
      </div>
    </Box>
  );
}
