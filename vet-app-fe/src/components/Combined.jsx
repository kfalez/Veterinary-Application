import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import AnimalTab from "./AnimalTab";
import StickyHeadTable from "./Table";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Combined(props) {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>
              <StickyHeadTable id = {props.animal.animalId} />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <AnimalTab animal = {props.animal}/>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}