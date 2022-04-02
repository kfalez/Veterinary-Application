import React, { useState } from "react";
import Button from "@mui/material/Button";
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
  const animal = props.animal;
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [theLocation, setTheLocation] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusInput = (event) => {
    setStatus(event.target.value);
  };

  const handleLocationInput = (event) => {
    setTheLocation(event.target.value);
  };

  const handleOkay = (event) => {
    if (animal && animal.animalStatus) {
      event.preventDefault();
      const user = JSON.parse(localStorage.getItem("user"));
      const newStatus = {
        userId: parseInt(user.id),
        location: theLocation,
        theStatus: status,
      };
      axios
        .patch(
          `${SERVER_URL}animals/status/${animal.animalStatus.statusId}`,
          newStatus,
          { headers: authToken() }
        )
        .then(window.location.reload());
      setOpen(false);
    } else {
      event.preventDefault();
      const user = JSON.parse(localStorage.getItem("user"));
      const newStatus = {
        animalId: parseInt(props.animal.animalId),
        userId: parseInt(user.id),
        theDate: "",
        location: theLocation,
        theStatus: status,
      };
      axios
        .post(`${SERVER_URL}animals/status/`, newStatus, {
          headers: authToken(),
        })
        .then(window.location.reload());
      setOpen(false);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        color="secondary"
        sx={{ m: 4 }}
      >
        Update Status
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Status</DialogTitle>
        <DialogContent>
          <FormControl sx={{ m: 1, width: "20ch" }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              label="status"
              placeholder="Status"
              onChange={handleStatusInput}
            >
              <MenuItem value={"Available"}>Available</MenuItem>
              <MenuItem value={"Unavailable"}>Unavailable</MenuItem>
              <MenuItem value={"Sick"}>Sick</MenuItem>
              <MenuItem value={"Injured"}>Injured</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: "20ch" }}>
            <InputLabel id="demo-simple-select-label">Location</InputLabel>
            <Select
              labelId="location-label"
              id="location"
              label="location"
              placeholder="location"
              onChange={handleLocationInput}
            >
              <MenuItem value={"Barn"}>Barn</MenuItem>
              <MenuItem value={"Farm"}>Farm</MenuItem>
              <MenuItem value={"Campus"}>Campus</MenuItem>
              <MenuItem value={"Clinic"}>Clinic</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOkay}>Okay</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
