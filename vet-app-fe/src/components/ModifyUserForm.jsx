import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Link } from "react-router-dom"; //added
import { useLocation } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../constants.js";
import { useHistory } from "react-router-dom";
import authToken from "../authentication/DataService";

export default function ModifyUserForm(props) {
  const [values, setValues] = useState({
    active: true,
    password: null,
    role: null,
  });

  const history = useHistory();
  const location = useLocation();
  const data = location.state.data[0];

  const [active, setActive] = useState(true);
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  const passwordInputChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const handleRolesChange = (event) => {
    setRole(event.target.value);
  };

  const handleActiveChange = (event) => {
    setActive(event.target.value);
  };

  const handleModifyUser = () => {
    console.log(data);
    axios
      .patch(
        `${SERVER_URL}users/${data.id}`,
        {
          username: data.username,
          active: active,
          email: data.email,
          password: password,
          role: [].concat(role),
        },
        {
          headers: authToken(),
        }
      )
      .then((response) => console.log(response))
      .then(() => {
        history.push("/users");
        window.location.reload();
      });
  };

  useEffect(() => {}, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Grid sx={{ p: 4 }} item style={{ marginRight: "auto" }}>
          <Stack spacing={3}>
            <Typography variant="h3" color="primary">
              Modify User
            </Typography>

            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-username">
                Username
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-username"
                label="Username"
                placeholder="Enter username"
                value={data.username}
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Active Status
              </InputLabel>
              <Select
                labelId="status-type-label"
                id="status"
                label="Status"
                onChange={handleActiveChange}
                placeholder="Select Status"
              >
                <MenuItem value={true}>Active</MenuItem>
                <MenuItem value={false}>Inactive</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-email">
                Email Address
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                value={data.email}
                label="Email Address"
                placeholder="Enter email address"
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "40ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-username">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-username"
                onChange={passwordInputChangeHandler}
                label="Password"
                placeholder="Enter password"
              />
            </FormControl>

            <Button
              onClick={handleModifyUser}
              variant="contained"
              color="success"
              sx={{ m: 1 }}
            >
              Modify User
            </Button>
            <Button
              component={Link}
              to="/users"
              variant="contained"
              color="error"
              sx={{ m: 1 }}
            >
              Cancel
            </Button>
          </Stack>
        </Grid>
      </div>
    </Box>
  );
}
