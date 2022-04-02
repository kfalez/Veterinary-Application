import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PhotoGrid from "./PhotoGrid";
import Comment from "./Comment";
import RxTable from "./RxTable";
import AlertsTable from "./AlertsTable";

export default function AnimalTab(props) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "80", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Images" value="1" />
            <Tab label="Comments" value="2" />
            <Tab label="Rx" value="3" />
            <Tab label="Alerts" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <PhotoGrid animal = {props.animal}/>
        </TabPanel>
        <TabPanel value="2">
          <Comment animal = {props.animal}/>
        </TabPanel>
        <TabPanel value="3">
          <RxTable animal = {props.animal}/>
        </TabPanel>
        <TabPanel value="4">
          <AlertsTable animal = {props.animal}/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
