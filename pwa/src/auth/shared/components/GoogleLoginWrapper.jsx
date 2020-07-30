
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useStoreActions } from 'easy-peasy';
import React from 'react';
import { Button } from 'react-bootstrap';
import authConfig from '../../../config.json';
import { GoogleLogin } from 'react-google-login';




export function GoogleLoginWrapper() {
    const loginGoogle = useStoreActions(actions => actions.user.loginGoogle);
    const loginError = useStoreActions(actions => actions.user.loginError);
    let responseGoogle = (googleUser) => {
        const code = googleUser.getAuthResponse().id_token;
        loginGoogle(code);
    }
    let failureGoogle = (error) => {
        loginError("Failed to authorize user.");
    }
    return (
        <GoogleLogin
            clientId={authConfig.google.clientId}
            render={renderProps => (
                <Button
                    onClick={renderProps.onClick} disabled={renderProps.disabled}
                    className="btn btn-google btn-user btn-block no-focus-effects d-flex justify-content-center align-items-center">
                    <FontAwesomeIcon className="social-icon" icon={faGoogle} />
                                                                    Login with Google
                </Button>
            )}
            onSuccess={responseGoogle}
            onFailure={failureGoogle}
            cookiePolicy={'single_host_origin'}
        />
    );
}