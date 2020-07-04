import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStoreActions } from 'easy-peasy';
import React from 'react';
import config from '../../../config.json';



export function FacebookVerify() {
    // const loginFacebook = useStoreActions(actions => actions.user.loginFacebook);

    function openPopup() {

        const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
        const oauthWindow = window.open(encodeURI(`${config.facebook.uri}/?redirect_uri=${host}${config.facebook.redirectURI}&client_id=${config.temp.AppId}&scope=${config.facebook.scope}&response_type=token&state={"{st=state123abc,ds=123456789}"}`));

        var timer = setInterval(function () {
            if (oauthWindow.closed) {
                clearInterval(timer);
                const redirectUrl = new URL(localStorage.getItem('oAuthRedirectUrl'));
                const searchParams = redirectUrl.searchParams;
                console.log(searchParams);
                
                const code = searchParams.get('access_token');
                // const error = searchParams.get('error');

                console.log(code);

                // loginFacebook(code);
            }
        }, 1000);
    }


    return (

        <button
            onClick={() => openPopup()}
            className="btn btn-facebook btn-block no-focus-effects d-flex justify-content-center align-items-center ">
            <FontAwesomeIcon className="social-icon" icon={faFacebook} />
                Login with Facebook
        </button>

    );
}