import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
//import 'bootstrap/dist/css/bootstrap.min.css'
import './lib/bootstrap.min.css';
import './index.css';
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Brand } from './brand/Brand';
import { Influencer } from './influence/Influencer';
import { Auth } from './auth/Auth';
function Index() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Redirect from="/" exact to="/auth" />
          <Route  path="/brand" component={Brand} />
          <Route  path="/influencer" component={Influencer} />
          <Route  path="/auth" component={Auth} />
        </Switch>
      </Router>
    </Provider>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();