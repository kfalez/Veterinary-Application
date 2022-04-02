import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import AddAlertButton from "./AddAlertButton";
import auth from "../authentication/AuthenticationService";

const columns = [
  { id: "priority", label: "Priority", minWidth: 170 },
  { id: "message", label: "Message", minWidth: 100 },
  { id: "location", label: "Location", minWidth: 170 },
];

function createData(priority, message, location) {
  return { priority, message, location };
}

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
      if ((list[i].priority === obj.priority) && (list[i].message === obj.message) && (list[i].location === obj.location)){
          return true;
      }
  }

  return false;
}

export default function AlertsTable(props) {

  const [rows, setRows] = useState([]);

  const [currentUser, setCurrentUser] = useState(undefined);
  const [showAddAlertButton, setShowAddAlertButton] = useState(false);

  useEffect(() => {
    const user = auth.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      if (
        user.roles.includes("ROLE_ANIMAL_CARE_ATTENDANT") === true
      ) {
        setShowAddAlertButton(true);
      }
    }
  }, []);

  return (
    
    <div>
      {((props.animal.alerts || []).forEach((element) => {
        if(!containsObject(createData(element.priority, element.message, element.location), rows)) {
          rows.push(createData(element.priority, element.message, element.location))
        }
        }))}
      <Box>
        <Box display="flex" justifyContent="flex-end">
          {showAddAlertButton && (<AddAlertButton animal = {props.animal}/>)}
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