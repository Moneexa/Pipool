import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStoreActions } from 'easy-peasy';
import React from 'react';
import config from '../../../config.json';
import { Modal, Button } from 'react-bootstrap'

import { useState } from 'react';
import axios from 'axios';

export function InstagramVerify({
    category,
    basicPrice,
    basicDescription,
    standardPrice,
    standardDescription,
    premiumPrice,
    premiumDescription
}) {
    const authInsta = useStoreActions(actions => actions.channels.authInsta)
    const [showPopup, setShowPopup] = useState(false)
    const [token, setToken] = useState(false)
    const [selectedAccount, setSelectedAccount] = useState(0)
    const [accountsList, setAccountsList] = useState([])
    const formValid = (category && basicPrice && basicDescription && standardPrice && standardDescription && premiumPrice && premiumDescription);
    function openPopup() {
        //   authenticateInsta();
        const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
        const oauthWindow = window.open(encodeURI(`${config.instagramBasic.uri}/?redirect_uri=${host}${config.instagramBasic.redirectURI}&client_id=${config.instagramBasic.appId}&scope=${config.instagramBasic.scope}&response_type=token&state={"{st=state123abc,ds=123456789}"}`));

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
                        console.log(res)

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
        authInsta({
            token: token, 
            id: accountsList[selectedAccount].instagram_business_account.id,
            category: category,
            basicPrice,
            basicDescription,
            standardPrice,
            standardDescription,
            premiumPrice,
            premiumDescription
        })

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
            <button
                type="button" disabled={!formValid}

                onClick={() => openPopup()}
                className="btn btn-primary rounded-20 text-white">
                <FontAwesomeIcon icon={faInstagram} /> Instagram +
            </button>
        </>
    );
}