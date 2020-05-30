import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
//import 'bootstrap/dist/css/bootstrap.min.css'
import './lib/bootstrap.min.css';
import './index.css';
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Dashboard } from './dashboard/Dashboard';
import { Auth } from './auth/Auth';
function Index_() {
  return (
    <Provider store={store}>
      <Router>
        <Route  path="/dashboard" component={Dashboard} />
        <Route  path="/auth" component={Auth} />
      </Router>
    </Provider>
  );
}

ReactDOM.render(<Index_ />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();