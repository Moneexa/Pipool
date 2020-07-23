import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStoreActions } from 'easy-peasy';
import React from 'react';
import axios from 'axios'
import config from '../../../config.json';



export function FacebookVerify() {
    const authFacebook = useStoreActions(actions => actions.channels.authFacebook);

    function openPopup() {
        const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
        const oauthWindow = window.open(encodeURI(`${config.instagram.uri}/?redirect_uri=${host}${config.instagram.redirectURI}&client_id=${config.instagram.appId}&scope=${config.instagram.scope}&response_type=token&state={"{st=state123abc,ds=123456789}"}`));

        var timer = setInterval(function () {
            console.log("here")
            if (oauthWindow.closed) {
                clearInterval(timer);
                const redirectUrl = new URL(localStorage.getItem('oAuthRedirectUrl').replace('?#', '?'));
                const searchParams = redirectUrl.searchParams;
                console.log(searchParams);

                const code = searchParams.get('access_token');
               // setToken(code);
                // const error = searchParams.get('error');
                console.log(code)
                axios.get(`https://graph.facebook.com/v7.0/me/accounts?fields=instagram_business_account,name,id&access_token=${code}`)
                    .then(res => {
                        console.log(res.data.data[0]["id"])
                        const payload={
                            token:code,
                            id: res.data.data[0]["id"]
                        }
                        authFacebook(payload)
                        //setAccountsList(res.data.data)
                        //setShowPopup(true);
                    })
                    .catch(console.error)

                // loginFacebook(code);

            }
        }, 1000);
        
    }


    return (

        <button type="button"
            onClick={() => openPopup()}
            className="btn btn-primary rounded-20 text-white">
            <FontAwesomeIcon icon={faFacebook} />
            &nbsp; Facebook +
        </button>

    );
}