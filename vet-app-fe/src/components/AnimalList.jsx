import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../constants.js";
import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Axios from "axios";
import authToken from "../authentication/DataService";

//Reqests management from hackathon
export default function AnimalList() {
  const [colDefs] = useState([
    { field: "id", headerName: "Animal ID", width: 200 },
    { field: "name", headerName: "Name", width: 350 },
    { field: "tattooNum", headerName: "Tatoo Number", width: 350 },
    { field: "species", headerName: "Species", width: 350 },
    { field: "requestedBy", headerName: "Requested By", width: 350 },
  ]);

  const [rowData, setRowData] = useState([]);
  const [data, setData] = useState("");
  const [selectedAnimal, setselectedAnimal] = useState([]);

  useEffect(() => {
    (async () => {
      fetch(SERVER_URL + "animals/", { headers: authToken() })
        .then((response) => response.json())
        .then((rowData) => {
          // animals: responseData
          const animalData = rowData.map((a) => {
            return {
              id: a.animalId,
              name: a.animalName,
              tattooNum: a.tattooNum,
              species: a.species,
              requestedBy: a.requestedBy,
            };
          });
          setRowData(animalData);
        })
        .catch((err) => console.error(err));
    })();
  }, [selectedAnimal]);

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        columns={colDefs}
        rows={rowData}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(ids) => {
          const selectedIDs = new Set(ids);
          const selectedRowData = rowData.filter((row) =>
            selectedIDs.has(row.id)
          );
          setData(selectedRowData);
        }}
      />
    </div>
  );
}
