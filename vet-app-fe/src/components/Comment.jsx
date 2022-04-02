import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/material";
import NewCommentButton from "./NewCommentButton";
import auth from "../authentication/AuthenticationService";

const columns = [
  { id: "username", label: "Author", minWidth: 100 },
  { id: "theDescription", label: "Description", minWidth: 100 },

];

function createData(username, theDescription) {
  return { username, theDescription };
}

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
      if ((list[i].username === obj.username) && (list[i].theDescription === obj.theDescription)){
          return true;
      }
  }

  return false;
}

export default function CommentsTable(props) {

 const [rows] = useState([]);

 const [currentUser, setCurrentUser] = useState(undefined);
 const [showNewCommentButton, setshowNewCommentButton] = useState(false);

  useEffect(() => {
    const user = auth.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      if (
        user.roles.includes("ROLE_TEACHING_TECHNICIAN") === true || 
        user.roles.includes("ROLE_STUDENT") === true
      ) {
        setshowNewCommentButton(true);
      }
    }
  }, []);

  return (
    <div>
      {(props.animal.theComment || []).forEach((element) => {
        if(!containsObject(createData(element.username, element.theDescription), rows)) {
          rows.push(createData(element.username, element.theDescription))
        }
          
        })}

      <Box>
        <Box display="flex" justifyContent="flex-end">
          {showNewCommentButton && (<NewCommentButton animal = {props.animal} />)}
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