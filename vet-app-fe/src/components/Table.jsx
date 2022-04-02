import React, { useEffect, useState } from "react";
import { SERVER_URL } from "../constants.js";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import authToken from "../authentication/DataService";

const columns = [
  { id: "attribute", label: "Attribute", minWidth: 170 },
  { id: "value", label: "Value", minWidth: 100 },
];

function createData(attribute, value) {
  return { attribute, value };
}

var rows = [];

export default function StickyHeadTable(props) {
  const [animals, setAnimals] = useState([]);
  const id = props.id

  useEffect(() => {
    fetch(SERVER_URL + "animals/" + props.id, {headers: authToken()},)
      .then((response) => response.json())
      .then((data) => {
        const animalData = [data].map((a) => {
          return {
            animalName: a.animalName,
            species: a.species,
            subspecies: a.subspecies,
            breed: a.breed,
            sex: a.sex,
            distinguishingFeatures: a.distinguishingFeatures,
            tattooNum: a.tattooNum,
            cityTattoo: a.cityTattoo,
            rfid: a.rfid,
            microchip: a.microchip,
            birthDate: a.birthDate,
            color: a.color,
            weight: a.weight,
            diet: a.diet,
            region: a.region,          
          };
        });
       setAnimals(animalData);   
      })
      .catch((err) => console.error(err));
}, [id]);

  return (  
    <div>
    {animals.map(a => {
     
    rows = [
            createData("Animal Name", a.animalName),
            createData("Species", a.species),
            createData("Subspecies", a.subspecies),
            createData("Breed", a.breed),
            createData("Sex", a.sex),
            createData("Distinguishing Features", a.distinguishingFeatures),
            createData("Tattoo #", a.tattooNum),
            createData("City Tattoo", a.cityTattoo),
            createData("RFID", a.rfid),
            createData("Microchip", a.microchip),
            createData("Birth Date", a.birthDate),
            createData("Color", a.color),
            createData("Weight", a.weight),
            createData("Diet", a.diet),
            createData("Region", a.region),
     ];
                   
   })}
    
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
    </div>
  );
}