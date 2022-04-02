import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../constants.js";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom"; //added
import authToken from "../authentication/DataService";
import AlertDialog from "./UserDeleteDialog";
import auth from "../authentication/AuthenticationService";

export default function UsersList() {
  const [colDefs] = useState([
    { field: "id", headerName: "User ID", width: 200 },
    { field: "username", headerName: "Username", width: 300 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "active", headerName: "Status", width: 300 },
    { field: "role", headerName: "Role", width: 300 },
  ]);

  const [rowData, setRowData] = useState([]);
  const [data, setData] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);

  var selectedRowData = 0;

  useEffect(() => {
    const user = auth.getCurrentUser();

    (async () => {
      fetch(SERVER_URL + "users/", { headers: authToken() })
        .then((response) => response.json())
        .then((rowData) => {
          let userData;
          if (user.roles.includes("ROLE_TEACHING_TECHNICIAN")) {
            const filteredData = rowData.filter(
              (u) => u.roles[0].name === "ROLE_STUDENT"
            );
            userData = filteredData.map((u) => {
              console.log(u.roles[0].name);
              return {
                id: u.id,
                username: u.username,
                email: u.email,
                active: u.active ? "Active" : "Blocked",
                role: u.roles[0].name,
              };
            });
          } else {
            userData = rowData.map((u) => {
              return {
                id: u.id,
                username: u.username,
                email: u.email,
                active: u.active ? "Active" : "Blocked",
                role: u.roles[0].name,
              };
            });
          }
          setRowData(userData);
        })
        .catch((err) => console.error(err));
    })();
  }, [selectedUser]);

  return (
    <div style={{ height: 700, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1, m: 1 }}>
        <Button
          component={Link}
          to="/users/new"
          variant="contained"
          color="success"
          sx={{ m: 1 }}
        >
          Add New User
        </Button>{" "}
        <Button
          component={Link}
          to={{ pathname: "/users/modify", state: { data } }}
          variant="contained"
          color="secondary"
          sx={{ m: 1 }}
        >
          Modify User
        </Button>
        <AlertDialog data={data} />
      </Box>
      <DataGrid
        columns={colDefs}
        rows={rowData}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          selectedRowData = rowData.filter((row) => selectedIDs.has(row.id));
          const userData = selectedRowData;
          setData(userData);
          setData((state) => {
            return state;
          });
        }}
      />
    </div>
  );
}
