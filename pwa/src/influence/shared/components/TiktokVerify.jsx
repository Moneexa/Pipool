import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStoreActions } from 'easy-peasy';
import React, { useState } from 'react';
import config from '../../../config.json';
import { Modal } from 'react-bootstrap'

import { faTiktok } from '@fortawesome/free-brands-svg-icons'
import { useEffect } from 'react';

export function TiktokVerify() {
    // const loginFacebook = useStoreActions(actions => actions.user.loginFacebook);
    const authenticateTiktok = useStoreActions(actions => actions.channels.authenticateTiktok)
    const [pop, setPop] = useState(false)
    const [i, setI] = useState(0)

    function openPopup() {

        //authenticateInsta();
        setPop(true);
    }
    function hideModal() {

        setPop(false);
    }
    useEffect(() => {
        setI(i+1)
        console.log(i)
    }, []);
    function userId() {
    }

    return (
        <>
            <Modal show={pop} handleClose={hideModal} >
                <form onSubmit={userId}>
                    <label ><h4> What is your tiktok id</h4></label>
                    <input type="text"></input>
                    <button type="submit">Save</button>
                </form>
            </Modal>
            <button
                onClick={() => openPopup()}
                className="btn btn-primary rounded-20 text-white">
                <FontAwesomeIcon icon={faTiktok} />
                + Tiktok Account
        </button>
        </>

    );
}