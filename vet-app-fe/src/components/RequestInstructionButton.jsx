import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { SERVER_URL } from "../constants.js";
import authToken from "../authentication/DataService";
import DialogContentText from "@mui/material/DialogContentText";

export default function RequestInstructionButton(props) {

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleRequest = (event) => {
    setOpen(true);
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const newRequest = {
      requestedBy: user.username
    }
     axios.patch(
       `${SERVER_URL}animals/${props.animal.animalId}`,
       newRequest,
       {headers: authToken()}
     )
     .then((response) => console.log(response))
    console.log(newRequest);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        sx={{ m: 4 }}
        onClick={handleClickOpen, handleRequest}
      >
        Request Instruction
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Instruction Request Submitted."}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your instruction request has been received. Thank you.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Okay</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
}
