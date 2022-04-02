import React, { useState }  from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { SERVER_URL } from "../constants.js";
import authToken from "../authentication/DataService";

export default function NewCommentButton(props) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    description: "",
  });

  const [description, setTheDescription] = useState("");

  const handleTheDescriptionInput = (event) => {
    setTheDescription(event.target.value);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const newDescription =
      {
        userId: parseInt(user.id),
        animalId: parseInt(props.animal.animalId),
        theDescription: description,
        username: user.username
      }
      axios.post(
        `${SERVER_URL}animals/comments/`,
        newDescription,
        {headers: authToken()}
      )
      .then(window.location.reload())
    console.log(`${SERVER_URL}animals/comments/`);
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} color="secondary" sx={{ m: 1 }}>
        New Comment
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Comment</DialogTitle>
        <DialogContent>

          <TextField
            multiline="true"
            autoFocus
            margin="dense"
            id="theDescription"
            onChange={handleTheDescriptionInput}
            label="Comment Description"
            type="text"
            fullWidth
            variant="standard"
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
