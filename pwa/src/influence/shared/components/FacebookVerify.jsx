import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStoreActions } from 'easy-peasy';
import React from 'react';
import axios from 'axios'
import config from '../../../config.json';
import { Modal, Button } from 'react-bootstrap'

import { useState } from 'react';


export function FacebookVerify(props) {
    const authFacebook = useStoreActions(actions => actions.channels.authFacebook);
    const [showPopup, setShowPopup] = useState(false)
    const [token, setToken] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState(0)
    const [accountsList, setAccountsList] = useState([])
    function openPopup() {
        const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
        const oauthWindow = window.open(encodeURI(`${config.facebookPages.uri}/?redirect_uri=${host}${config.facebookPages.redirectURI}&client_id=${config.facebookPages.appId}&scope=${config.facebookPages.scope}&response_type=token&state={"{st=state123abc,ds=123456789}"}`));

        var timer = setInterval(function () {
            console.log("here")
            if (oauthWindow.closed) {
                clearInterval(timer);
                const redirectUrl = new URL(localStorage.getItem('oAuthRedirectUrl').replace('?#', '?'));
                const searchParams = redirectUrl.searchParams;
                console.log(searchParams);

                const code = searchParams.get('access_token');
                setToken(code);
                // const error = searchParams.get('error');
                console.log(code)
                axios.get(`https://graph.facebook.com/v7.0/me/accounts?fields=instagram_business_account,name,id&access_token=${code}`)
                    .then(res => {

                        setAccountsList(res.data.data)
                        setShowPopup(true);
                    })
                    .catch(console.error)

                // loginFacebook(code);

            }
        }, 1000);

    }
    function handleSubmit() {
        console.log(selectedAccount)
        console.log(accountsList)
        authFacebook({ token: token, id: accountsList[selectedAccount].id, category: props.category })

        //console.log('here')
        setShowPopup(false)
    }
    function handleClose() {
        setShowPopup(false)

    }

    return (
        <>
            <Modal show={showPopup}
                databackdrop="false"
                onHide={() => handleClose()}
                className="shadow-lg d-flex align-items-center"
                style={{
                    position: "absolute",

                }}

            >
                <Modal.Header closeButton>
                    <Modal.Title>Choose an account you want to add</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        accountsList.map((value, index) =>
                            <label key={index}>
                                <input type="radio" name="account" value={index} checked={selectedAccount === index} onChange={(ev) => setSelectedAccount(ev.target.value)} />
                                {value.name}
                            </label>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
            <button type="button"
                onClick={() => openPopup()}
                className="btn btn-primary rounded-20 text-white"
                disabled={!props.category}
            >
                <FontAwesomeIcon icon={faFacebook} />
            &nbsp; Facebook +
        </button>
        </>
    );
}