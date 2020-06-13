import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useStoreActions } from 'easy-peasy';
import React from 'react';
import config from '../auth.config.json';



export function LinkedIn() {
    const login = useStoreActions(actions => actions.user.login);
    

    function openPopup() {

        const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
        const oauthWindow = window.open(encodeURI(`${config.linkedin.uri}/?redirect_uri=${host}${config.linkedin.redirectURI}&client_id=${config.linkedin.clientId}&scope=${config.linkedin.scope}&response_type=${config.linkedin.responseType}`));

        var timer = setInterval(function () {
            if (oauthWindow.closed) {
                clearInterval(timer);
                const redirectUrl = new URL(localStorage.getItem('oAuthRedirectUrl'));
                const searchParams = redirectUrl.searchParams;
                const code = searchParams.get('code');
                const error = searchParams.get('error');

                console.log(code, error);
                axios.post(`http://localhost:4242/api/auth/login/linkedin`, { code })
                    .then(res => {
                        login(res.data);
                        console.log(res)
                    })
                    .catch((error) => console.error(error.message));
            }
        }, 1000);
        console.log(oauthWindow.location);


    }


    return (

        <button
            onClick={() => openPopup()}
            className="btn btn-linkedin btn-block no-focus-effects d-flex justify-content-center align-items-center ">
            <FontAwesomeIcon className="social-icon" icon={faLinkedin} />
                Login with LinkedIn
        </button>

    );
}