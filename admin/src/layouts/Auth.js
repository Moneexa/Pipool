/*!

=========================================================
* Now UI Dashboard PRO React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// core components
import Footer from "components/Footer/Footer.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import LoginPage from "views/Pages/LoginPage";

class Auth extends React.Component {
  state = {
    filterColor: "yellow",
  };
  handleColorClick = (color) => {
    this.setState({ filterColor: color });
  };
  render() {
    return (
      <>
        <div className="wrapper wrapper-full-page">
          <div
            className="full-page section-image"
            filter-color={this.state.filterColor}
          >
            <Switch>
              
              <Route path="/auth/login-page" component={LoginPage} />
              <Redirect from="/auth" to="/auth/login-page" />
            </Switch>
          </div>
        </div>
        <FixedPlugin
          bgColor={this.state.filterColor}
          handleColorClick={this.handleColorClick}
        />
      </>
    );
  }
}

export default Auth;
