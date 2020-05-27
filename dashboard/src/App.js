import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './shared/header'
import CommitteeList from './shared/CommitteeList'
import { CommitteeAttendance } from './shared/CommitteeAttendance'
import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./shared/store/store"

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Router>
          <Switch>
            <Route exact path="/">
              <CommitteeList />
            </Route>
            <Route exact path="/committeeAtt">
              <CommitteeAttendance />
            </Route>
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;