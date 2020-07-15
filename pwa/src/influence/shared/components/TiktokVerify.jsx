import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStoreActions } from 'easy-peasy';
import React from 'react';
import config from '../../../config.json';

import {faTiktok} from '@fortawesome/free-brands-svg-icons'

export function TiktokVerify() {
    // const loginFacebook = useStoreActions(actions => actions.user.loginFacebook);
const authenticateInsta =  useStoreActions(actions=>actions.channels.authenticateInstagram)
    function openPopup() {

      authenticateInsta();
    }


    return (

        <button
            onClick={() => openPopup()}
            className="btn btn-primary rounded-20 text-white">
            <FontAwesomeIcon icon={faTiktok} />
                + Tiktok Account
        </button>

    );
}