import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Login } from './pages/Login';

import { FinishSignup } from './pages/FinishSignup';

export function Auth({ match }) {
    return (
        <>
            <Switch>
                <Redirect from={`${match.path}/`} exact to={`${match.path}/login`} />
                <Route path={`${match.path}/login`} component={Login} />

                <Route path={`${match.path}/finish-signup`} component={FinishSignup} />
            </Switch>
            {/* </Router> */}
            
        </>
    );
}
