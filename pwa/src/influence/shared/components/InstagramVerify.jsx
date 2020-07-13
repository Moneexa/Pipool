import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStoreActions } from 'easy-peasy';
import React from 'react';
import config from '../../../config.json';



export function InstagramVerify() {
    // const loginFacebook = useStoreActions(actions => actions.user.loginFacebook);
const authenticateInsta =  useStoreActions(actions=>actions.channels.authenticateInstagram)
    function openPopup() {

      authenticateInsta();
    }


    return (

        <button
            onClick={() => openPopup()}
            className="btn btn-primary rounded-20 text-white">
            <FontAwesomeIcon icon={faInstagram} />
                + Instagram Account
        </button>

    );
}