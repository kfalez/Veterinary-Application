import axios from "axios";
import { SERVER_URL } from "../constants.js";
import { useHistory } from "react-router-dom";

const signup = (username, active, email, password, activationDate, role) => {
  return axios.post(`${SERVER_URL}auth/signup`, {
    username,
    active,
    email,
    password,
    activationDate,
    role,
  });
};

const signin = (username, password) => {
  return axios
    .post(`${SERVER_URL}auth/signin`, {
      username,
      password,
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("isAuthenticated", "true");
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.clear();
  window.location.reload();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const auth = {
  signin,
  signup,
  logout,
  getCurrentUser,
};

export default auth;
