import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

export function Auth({ match }) {
    return (
        <>
            <Switch>
                <Redirect from={`${match.path}/`} exact to={`${match.path}/signup`} />
                <Route path={`${match.path}/login`} component={Login} />
                <Route path={`${match.path}/signup`} component={Signup} />
            </Switch>
            {/* </Router> */}
            
        </>
    );
}
