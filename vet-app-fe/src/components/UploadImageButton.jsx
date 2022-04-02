import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { SERVER_URL } from "../constants.js";
import authToken from "../authentication/DataService";

export default function UploadImageButton(props) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [file, setFile] = useState("");
  const [date, setDate] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const newImage = {
      userId: parseInt(user.id),
      creationDate: date,
      theFile: file,
      animalId: parseInt(props.animal.animalId),
      theType: type
    }
    axios.post(
      `${SERVER_URL}animals/photos/`,
      newImage,
      {headers: authToken()}
    )
    .then(window.location.reload())
    setOpen(false);
  };

  const handleTypeInput = (event) =>{
    setType(event.target.value)
  }

  const handleDateInput = (event) =>{
    setDate(event.target.value)
  }

  const handleFileInput = (event) =>{
    setFile(event.target.value)
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} color="secondary" sx={{ m: 1 }}>
        Upload
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
        <FormControl sx={{ m: 1, width: "65ch" }}>
              <InputLabel id="demo-simple-select-label">Image Type</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                label="type"
                placeholder="Image Type"
                onChange={handleTypeInput}
              >
                <MenuItem value={"Profile"}>Profile Photo</MenuItem>
                <MenuItem value={"Injury"}>Injury Photo</MenuItem>
                <MenuItem value={"Medical Record"}>Medical Record Photo</MenuItem>
              </Select>
            </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Date"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleDateInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="File"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleFileInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
