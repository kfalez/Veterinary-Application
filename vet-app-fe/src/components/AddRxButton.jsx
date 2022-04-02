import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { SERVER_URL } from "../constants.js";
import authToken from "../authentication/DataService";

export default function AddRxButton(props) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState({
    date: "",
    theInstructions: "",
    theDrugId: "",
    theDosage: "",
    theDeliveryMethod: "",
    theDrugName: "",
    theTreatmentMethodId: "",
  });
  
  const [date, setDate] = useState("");
  const [theInstructions, setInstructions] = useState("");
  const [theDrugId, setDrugId] = useState("");
  const [theDosage, setDosage] = useState("");
  const [theDeliveryMethod, setDeliveryMethod] = useState("");
  const [theDrugName, setDrugName] = useState("");
  const [theTreatmentMethodId, setTreatmentMethodId] = useState("");

  const handleDateInput = (event) => {
    setDate(event.target.value);
  };

  const handleInstructionsInput = (event) => {
    setInstructions(event.target.value);
  };

  const handleDrugIdInput = (event) => {
    setDrugId(event.target.value);
  };
  
  const handleDosageInput = (event) => {
    setDosage(event.target.value);
  };

  const handleDeliveryMethodInput = (event) => {
    setDeliveryMethod(event.target.value);
  };

  const handleTreatmentMethodIdInput = (event) => {
    setTreatmentMethodId(event.target.value);
  };

  const handleDrugNameInput = (event) => {
    setDrugName(event.target.value);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const newPrescription =
      {
        userId: parseInt(user.id),
        animalId: parseInt(props.animal.animalId),
        theDate: date,
        instructions: theInstructions,
        DrugId: parseInt(theDrugId),
        dosage: theDosage,
        deliveryMethod: theDeliveryMethod,
        drugName: theDrugName,
        treatmentMethodId: parseInt(theTreatmentMethodId),
      }
      axios.post(
        `${SERVER_URL}animals/prescriptions/`,
        newPrescription,
        {headers: authToken()}
      )
      .then(window.location.reload())
    console.log(`${SERVER_URL}animals/prescriptions/`);
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
        Add Rx
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Prescription</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={handleDateInput}
            label="Date"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={handleDrugNameInput}
            label="Drug Name"
            type="text"
            fullWidth
            variant="standard"
          />
            <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={handleDrugIdInput}
            label="Drug ID"
            type="text"
            fullWidth
            variant="standard"
          />

            <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={handleDosageInput}
            label="Dosage"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={handleDeliveryMethodInput}
            label="Delivery Method"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            multiline="true"
            autoFocus
            margin="dense"
            id="name"
            onChange={handleInstructionsInput}
            label="Instructions"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            multiline="true"
            autoFocus
            margin="dense"
            id="name"
            onChange={handleTreatmentMethodIdInput}
            label="Treatment ID"
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