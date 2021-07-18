import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "../App.css";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Welcome from "../pages/Welcome";
import Landing from "../pages/Landing";
import Footer from "./Footer";
import Header from "./Header";
import ForgetPass from '../pages/ForgetPass';
import { IconContext } from 'react-icons'

const App = () => {
  return (
    <BrowserRouter>
      <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
        <Header />

        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forget_password" component={ForgetPass} />
          <Route component={ErrorPage} />
        </Switch>

        <Footer />
      </IconContext.Provider>
    </BrowserRouter>
  );
};

export default App;
