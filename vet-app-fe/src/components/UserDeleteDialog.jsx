import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import authToken from "../authentication/DataService";
import axios from "axios";
import { SERVER_URL } from "../constants.js";
import { useHistory } from "react-router-dom";

export default function AlertDialog(props) {
  const history = useHistory();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    setOpen(false);
    console.log(props.data[0].id);
    axios
      .delete(`${SERVER_URL}users/${props.data[0].id}`, {
        headers: authToken(),
      })
      .then((response) => console.log(response))
      .then(() => {
        history.push("/users");
        window.location.reload();
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        color="error"
        sx={{ m: 1 }}
        onClick={handleClickOpen}
      >
        Delete User
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete this user?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you wish to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
