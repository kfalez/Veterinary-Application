import * as React from "react";
import { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import Paper from "@mui/material/Paper";
import auth from "../authentication/AuthenticationService";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import classes from "./MainHeader.module.css";
import SearchBar from "./SearchBar";
import Typography from "@mui/material/Typography";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 41),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "secondary",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  //Authentication to display users bar
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showUsers, setShowUsers] = useState(false);
  const [showNewAnimal, setShowNewAnimal] = useState(false);
  const [showRequests, setShowRequests] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showLogout, setShowLogout] = useState(false);
  const [showUserProfileName, setShowUserProfileName] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = auth.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      if (
        user.roles.includes("ROLE_ADMIN") === true ||
        user.roles.includes("ROLE_TEACHING_TECHNICIAN") === true
      ) {
        setShowUsers(true);
      }

      if (user.roles.includes("ROLE_ADMIN") === true) {
        setShowNewAnimal(true);
      }

      if (
        user.roles.includes("ROLE_ADMIN") === true ||
        user.roles.includes("ROLE_ANIMAL_HEALTH_TECHNICIAN") === true ||
        user.roles.includes("ROLE_TEACHING_TECHNICIAN")
      ) {
        setShowRequests(true);
      }

      if (user.roles.includes("") === false) {
        setShowLogin(false);
      }

      if (user.roles.includes("") === false) {
        setShowLogout(true);
      }
      if (
        user.roles.includes("ROLE_ADMIN") === true ||
        user.roles.includes("ROLE_ANIMAL_HEALTH_TECHNICIAN") === true ||
        user.roles.includes("ROLE_TEACHING_TECHNICIAN") === true ||
        user.roles.includes("ROLE_STUDENT") === true ||
        user.roles.includes("ROLE_ANIMAL_CARE_ATTENDANT") === true
      ) {
        setShowSearchBar(true);
      }

      if (
        user.roles.includes("ROLE_ADMIN") === true ||
        user.roles.includes("ROLE_ANIMAL_HEALTH_TECHNICIAN") === true ||
        user.roles.includes("ROLE_TEACHING_TECHNICIAN") === true ||
        user.roles.includes("ROLE_STUDENT") === true ||
        user.roles.includes("ROLE_ANIMAL_CARE_ATTENDANT") === true
      ) {
        setShowUserProfileName(true);
      }

      if (user.roles.includes("")) {
        setUserName("");
      } else {
        setUserName(user.roles[0].slice(5));
      }
    }
  }, []);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {showUsers && (
        <MenuItem component={Link} to="/users" onClick={handleMenuClose}>
          Users
        </MenuItem>
      )}
      {showNewAnimal && (
        <MenuItem
          component={Link}
          to="/animal/create"
          onClick={handleMenuClose}
        >
          New Animal
        </MenuItem>
      )}
      {showRequests && (
        <MenuItem component={Link} to="/animal-list" onClick={handleMenuClose}>
          Requests
        </MenuItem>
      )}
      {showLogin && (
        <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
          Log In
        </MenuItem>
      )}
      {showLogout && (
        <MenuItem component={Link} to="/login" onClick={auth.logout}>
          Logout
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color = "transparent">
        <Toolbar>
          <NavLink to="/welcome" activeClassName={classes.active}>
            <Paper variant="contained">
              <img height="67" width="225" src="./images/vetlogo.png" />
            </Paper>
          </NavLink>

          {showSearchBar && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <SearchBar />
            </Search>
          )}
          <Box sx={{ flexGrow: 1 }} />
          {showSearchBar && (
            <Box>
              <Typography variant="subtitle2" component="div" sx={{ flexGrow: 1 }}>
                {userName}
              </Typography>
            </Box>
          )}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="secondary"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="primary"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
