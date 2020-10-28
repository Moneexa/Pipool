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
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v=1.4.0";
import "assets/css/demo.css";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { StoreProvider } from 'easy-peasy';
import { store } from "./store/store";
import { useObservable } from "store";
import { isLoggedIn$ } from "store/user";

const hist = createBrowserHistory();

function Index() {
  const isLoggedIn = useObservable(isLoggedIn$)
  return (
    <StoreProvider store={store}>
      <Router history={hist}>
        <Switch>
          <Redirect from="/" exact to="/auth" />
          <ProtectedRoute path="/admin" redirectTo="/auth" isAuthenticated={isLoggedIn} component={AdminLayout} />
          <ProtectedRoute path="/auth" redirectTo="/admin" isAuthenticated={!isLoggedIn} component={AuthLayout} />
          {/* <Route
            path="/admin"
            render={(props) => {
              return <AdminLayout {...props} />;
            }}
          />
          <Route
            path="/auth"
            render={(props) => {
              return <AuthLayout {...props} />;
            }}
          />
          <Redirect to="/admin/dashboard" /> */}
        </Switch>
      </Router>
    </StoreProvider>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));

export function ProtectedRoute({ path, redirectTo, isAuthenticated, component }) {
  if (isAuthenticated) {
    return <Route path={path} component={component} />
  } else {
    return <Redirect to={redirectTo} />
  }
}