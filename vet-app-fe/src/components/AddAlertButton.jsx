import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { SERVER_URL } from "../constants.js";
import authToken from "../authentication/DataService";

export default function AddAlertButton(props) {
  const [open, setOpen] = React.useState(false);
  const [priority, setPriority] = useState("");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePriorityInput = (event) =>{
    setPriority(event.target.value)
  }

  const handleMessageInput = (event) =>{
    setMessage(event.target.value)
  }

  const handleLocationInput = (event) =>{
    setLocation(event.target.value)
  }

  const handleAdd = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const newAlert = {
      userId: parseInt(user.id),
      animalId: parseInt(props.animal.animalId),
      priority: priority,
      message: message,
      location: location
    }
    axios.post(
      `${SERVER_URL}animals/alerts/`,
      newAlert,
      {headers: authToken()}
    )
    .then((response) => console.log(response))
    .then(window.location.reload())
    console.log(props);
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        color="secondary"
        sx={{ m: 1 }}
      >
        Add Alert
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Alert</DialogTitle>
        <DialogContent>
          <FormControl sx={{ m: 1, width: "65ch" }}>
            <InputLabel id="demo-simple-select-helper-label">
              Priority
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Priority"
              onChange={handlePriorityInput}
            >
              <MenuItem value={"Low"}>Low</MenuItem>
              <MenuItem value={"Medium"}>Medium</MenuItem>
              <MenuItem value={"High"}>High</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Message"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleMessageInput}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Location"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleLocationInput}
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
