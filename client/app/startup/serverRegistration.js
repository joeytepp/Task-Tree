import ReactOnRails from "react-on-rails";

import StyleSheet from "../components/StyleSheet/StyleSheet";
import Landing from "../components/Landing/Landing";
import SignUp from "../components/SignUp/SignUp";
import Login from "../components/Login/Login";
import Home from "../components/Home/Home";

ReactOnRails.register({
  LandingStyles: StyleSheet(Landing),
  SignUpStyles: StyleSheet(SignUp),
  LoginStyles: StyleSheet(Login),
  HomeStyles: StyleSheet(Home),
  Landing,
  SignUp,
  Login,
  Home
});
