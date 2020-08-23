import React, { useState, useEffect } from 'react'
import config from '../../../config.json'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStoreActions } from 'easy-peasy';
import { Modal, Button } from 'react-bootstrap';
const gapi = window.gapi;
let GoogleAuth = window.GoogleAuth;
export function YoutubeVerify(props) {
    var SCOPE = 'https://www.googleapis.com/auth/youtubepartner-channel-audit';
    var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';

    const saveYoutube = useStoreActions(actions => actions.channels.saveYoutube)

    const [canSignIn, setCanSignIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [channels, setChannels] = useState([]);
    const [selectedChannelIndex, setSelectedChannelIndex] = useState(0);
    const [user, setUser] = useState(undefined);


    useEffect(() => {
        gapi.load('client:auth2', initClient);
    }, []);

    async function handleAuthClick() {
        const user = await GoogleAuth.signIn();
        gapi.client.setApiKey(config.google.apiKey);
        const channels = await gapi.client.youtube.channels.list({
            mine: true,
            part: 'id,statistics,snippet'
        });
        
        console.log(user.getAuthResponse().access_token)
        console.log(user.getBasicProfile())
        setUser({
            token: user.getAuthResponse().access_token,
            userId: user.getBasicProfile().getId(),
            name: user.getBasicProfile().getName()
        });
        setChannels(channels.result.items);
        setShowModal(true);
    }


    function initClient() {
        gapi.client.init({
            'apiKey': config.google.apiKey,
            'clientId': config.google.clientId,
            'discoveryDocs': [discoveryUrl],
            'scope': SCOPE
        }).then(function () {
            GoogleAuth = gapi.auth2.getAuthInstance();
            setCanSignIn(true)
        });
    }

    function handleClose() {
        
        setShowModal(false);
        const channel = channels[selectedChannelIndex];
        const body = {
            id: channel.id,
            token: user.token,
            category: props.category
        }
        saveYoutube(body);
    };

    return (

        <div>
            <button onClick={() => handleAuthClick()}
                disabled={!props.category || !canSignIn}

                className="btn btn-primary rounded-20 text-white" type="button" >
                <FontAwesomeIcon icon={faYoutube} /> Youtube +
            </button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Choose a channel you want to add</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        channels.map((value, index) =>
                            <label key={index}>
                                <input type="radio" name="channel" value={index} checked={selectedChannelIndex === index} onChange={(ev) => setSelectedChannelIndex(ev.target.value)} />
                                {value.snippet.title}
                            </label>
                        )
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>

    )

}