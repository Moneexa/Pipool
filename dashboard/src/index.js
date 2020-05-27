import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Layout from './shared/component/layout';
import { Provider } from "react-redux";
import store from "./shared/store/store";


function Index_() {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

ReactDOM.render(<Index_ />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();