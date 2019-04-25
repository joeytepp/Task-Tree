import ReactOnRails from "react-on-rails";

import Landing from "../components/Landing/Landing";
import SignUp from "../components/SignUp/SignUp";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";

import "../assets/styles/index.css";

ReactOnRails.register({
  Landing,
  SignUp,
  Login,
  Home
});
