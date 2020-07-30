import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

import { useStoreActions } from 'easy-peasy';
import React from 'react';
import { Button } from 'react-bootstrap';
import authConfig from '../../../config.json';




export function FacebookLoginWrapper() {
    const loginFacebook = useStoreActions(actions => actions.user.loginFacebook);
    let responseFacebook = (response) => {
        loginFacebook(response.accessToken);
    }
    return (
        <FacebookLogin
            appId={authConfig.facebook.clientId}
            callback={responseFacebook}
            render={renderProps => (
                <Button
                    onClick={renderProps.onClick}
                    className="btn btn-facebook btn-user btn-block no-focus-effects d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon className="social-icon" icon={faFacebook} />
                                                    Login with Facebook
                </Button>
            )}
        />
    );
}