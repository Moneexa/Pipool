import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { Brand } from './brand/Brand';
import { Influencer } from './influence/Influencer';
import { Auth } from './auth/Auth';
import { useStoreState } from 'easy-peasy';
import { Chat } from './Chat/Chat';

export function Routes() {
    const loggedIn = useStoreState(state => state.user.isLoggedIn);
    const role = useStoreState(state => state.user.role);
    return (
        <Router>
            <Switch>
                <Redirect from="/" exact to="/auth" />
                <ProtectedRoute path="/brand" redirectTo="/auth" isAuthenticated={loggedIn} component={Brand} />
                <ProtectedRoute path="/influencer" redirectTo="/auth" isAuthenticated={loggedIn} component={Influencer} />
                <ProtectedRoute path="/chat" redirectTo="/auth" isAuthenticated={loggedIn} component={Chat} />
                <ProtectedRoute path="/auth" redirectTo={'/'+(role || "brand")} isAuthenticated={!loggedIn} component={Auth} />
            </Switch>
        </Router>
    )
}


export function ProtectedRoute({ path, redirectTo, isAuthenticated, component }) {
    if (isAuthenticated) {
        return <Route path={path} component={component} />
    } else {
        return <Redirect to={redirectTo} />
    }
}