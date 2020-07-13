import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './lib/bootstrap.min.css';
import './index.css';
import { StoreProvider } from 'easy-peasy';
import { store } from "./store/store";
import { Routes } from './Routes';
import 'toastr/build/toastr.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

function Index() {
  return (
    <StoreProvider store={store}>
      <Routes />
    </StoreProvider>
  );
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();