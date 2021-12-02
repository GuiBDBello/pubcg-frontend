import "tailwindcss/dist/base.css";
import "styles/globalStyles.css";
import React from "react";

import MainLandingPage from "MainLandingPage.js";
import LoginPage from "pages/Login.js";
import SignupPage from "pages/Signup.js";
// import GameJamPage from "pages/GameJamPage.js";
import GamePage from "pages/GamePage.js";
import NewGamePage from "pages/NewGamePage.js";
import UserPage from "pages/UserPage.js";

import PrivateRoute from "./PrivateRoute";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  // If you want to disable the animation just use the disabled `prop` like below on your page's component
  // return <AnimationRevealPage disabled>xxxxxxxxxx</AnimationRevealPage>;

  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        {/* <Route path="/gameJams" component={GameJamPage} /> */}
        <Route path="/games/:id" component={GamePage} />
        {/* <Route path="/newGame" component={NewGamePage}/> */}
        <Route path="/users/:id" component={UserPage} />

        <PrivateRoute path="/newGame" component={NewGamePage} />

        <Route path="/">
          <MainLandingPage />
        </Route>
      </Switch>
    </Router>
  );
}
