import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import AddRxButton from "./AddRxButton";
import auth from "../authentication/AuthenticationService";

const columns = [
  { id: "theDate", label: "Date", minWidth: 100 },
  { id: "drugName", label: "Prescription", minWidth: 100 },
  { id: "deliveryMethod", label: "Delivery Method", minWidth: 100 },
  { id: "instructions", label: "Instructions", minWidth: 100 },

];

function createData(theDate, drugName, deliveryMethod, instructions) {
  return { theDate, drugName, deliveryMethod, instructions };
}

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
      if ((list[i].drugName === obj.drugName) && (list[i].instructions === obj.instructions) && (list[i].theDate === obj.theDate) && (list[i].deliveryMethod === obj.deliveryMethod)){
          return true;
      }
  }

  return false;
}

export default function RxTable(props) {

  const [currentUser, setCurrentUser] = useState(undefined);
  const [displayRxButton, setDisplayRxButton] = useState(false);
  const [rows] = useState([]);


  useEffect(() => {
    const user = auth.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      if (
        user.roles.includes("ROLE_ANIMAL_HEALTH_TECHNICIAN") === true
      ) {
        setDisplayRxButton(true);
      }
    }
  }, []);

  return (
    <div>
      
      {((props.animal.prescriptionRecords || []).forEach((element) => {
        if(!containsObject(createData(element.theDate, element.drugName, element.deliveryMethod ,element.instructions), rows)) {
          rows.push(createData(element.theDate, element.drugName, element.deliveryMethod, element.instructions))
        }
          
        }))}

      <Box>
        <Box display="flex" justifyContent="flex-end">
          {displayRxButton && (<AddRxButton animal = {props.animal} />)}
        </Box>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.Attribute}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </div>
  );
}
