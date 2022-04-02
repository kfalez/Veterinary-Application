import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { SERVER_URL } from "../constants.js";
import { useHistory } from "react-router-dom";
import authToken from "../authentication/DataService";

export default function SearchBar() {
  const [animals, setAnimals] = useState([]);
  const history = useHistory();

  var animalsTest = animals;

  useEffect(() => {
    fetch(SERVER_URL + "animals", {headers: authToken()})
      .then((response) => response.json())
      .then((data) => {
        const animalData = data.map((a) => {
          return {
            animalName: a.animalName,
            animalId: a.animalId,
          };
        });
        setAnimals(animalData);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSelection = (event, value) => {
      console.log(value);

    if (value === null) {
      console.log(value);
    } else {
      history.push({ pathname: "/animal-profile", state: value });
      window.location.reload();
    }
  };

  return (
    <Autocomplete
      disablePortal
      id="disableClearable"
      options={animalsTest}
      getOptionLabel={(option) => option.animalName}
      sx={{ width: 300 }}
      forcePopupIcon={true}
      noOptionsText={"No animal found"}
      onChange={handleSelection}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Animals .."
          sx={{ m: 1, width: "50ch" }}
        />
      )}
    />
  );
}
