import React from 'react';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

export function Auth({ match }) {
    return (
        <>
            <Router>
                <Route path={`${match.path}/login`}  component={Login} />
                <Route path={`${match.path}/signup`} component={Signup} />
            </Router>
        </>
    );
}
