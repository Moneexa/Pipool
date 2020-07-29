import React, { useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ChannelManager.css'
import config from '../../../config.json';
import { Modal, Button } from 'react-bootstrap'
import BarChart from 'react-bar-chart';
import CanvasJSReact from '../../../lib/Chart 2.3.2 GA - Stable/canvasjs.react';
import { useEffect } from 'react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function Channel() {
    const channels = useStoreState(state => state.channels.channels);
    const impressions = useStoreState(state => state.insights.impressions);
    const listChannels = useStoreActions(actions => actions.channels.listChannels);
    const insights = useStoreActions(actions => actions.insights.instaInsights)
    const fbinsights = useStoreActions(actions => actions.insights.fbInsights)
    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        listChannels();
    }, [])

    const instaInsights = props => {

        console.log(props)
        const channelId = props
        const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
        const oauthWindow = window.open(encodeURI(`${config.instagram.uri}/?redirect_uri=${host}${config.instagram.redirectURI}&client_id=${config.instagram.appId}&scope=${config.instagram.scope}&response_type=token&state={"{st=state123abc,ds=123456789}"}`));

        var timer = setInterval(function () {
            if (oauthWindow.closed) {
                clearInterval(timer);
                const redirectUrl = new URL(localStorage.getItem('oAuthRedirectUrl').replace('?#', '?'));
                const searchParams = redirectUrl.searchParams;
                console.log(searchParams);

                const code = searchParams.get('access_token');
                console.log(code)
                // setToken(code);
                // const error = searchParams.get('error');
                insights({ token: code, channelId: channelId })

            }
        }, 1000);

        setShowPopup(true)

    }
    const fbInsights = props => {

        console.log(props)
        const channelId = props
        const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
        const oauthWindow = window.open(encodeURI(`${config.instagram.uri}/?redirect_uri=${host}${config.instagram.redirectURI}&client_id=${config.instagram.appId}&scope=${config.facebook.scope}&response_type=token&state={"{st=state123abc,ds=123456789}"}`));

        var timer = setInterval(function () {
            if (oauthWindow.closed) {
                clearInterval(timer);
                const redirectUrl = new URL(localStorage.getItem('oAuthRedirectUrl').replace('?#', '?'));
                const searchParams = redirectUrl.searchParams;
                console.log(searchParams);

                const code = searchParams.get('access_token');
                console.log(code)
                // setToken(code);
                // const error = searchParams.get('error');
                fbinsights({ token: code, channelId: channelId })

            }
        }, 1000);

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
                    <Modal.Title>Insights</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CanvasJSChart options={impressions} style={{
                        width: "100%"

                    }} />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
            <div className="channel">


                <div className="d-sm-flex align-items-center justify-content-between mb-4">

                    <h2 className="m-0 font-weight-bold text-primary">Channel</h2>
                </div>

                <div className="row">
                    {channels.map((value, index) =>
                        <div id="border" key={index} className="col-xl-4   col-lg-7">

                            <div className="card shadow mb-4">
                                <div className="card-body">

                                    <img alt="" src="../img/users_profile.jpg" />
                                    <h4>{value.channelName}</h4>
                                    <p><b>Followers: {value.followers}</b></p>
                                    <p style={{ marginBottom: "50px" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                    <div className="text-center d-none d-md-inline">
                                        {
                                            value.channelType === "facebook" ?
                                                <button className="btn btn-floating btn-lg btn-fb" type="button" onClick={() => { fbInsights(value.channelId) }}>
                                                    <FontAwesomeIcon icon={faFacebookF} />
                                                </button> : ''
                                        }
                                        {
                                            value.channelType === "twitter" ?
                                                <button className="btn btn-floating btn-lg btn-tw" type="button">
                                                    <FontAwesomeIcon icon={faTwitter} />
                                                </button> : ''
                                        }
                                        {
                                            value.channelType === "linkedinin" ?
                                                <button className="btn btn-floating btn-lg btn-li" type="button">
                                                    <FontAwesomeIcon icon={faLinkedinIn} />
                                                </button> : ''
                                        }
                                        {
                                            value.channelType === "instagram" ?
                                                <button className="btn btn-floating btn-lg btn-ins" type="button" onClick={() => { instaInsights(value.channelId) }}>
                                                    < FontAwesomeIcon icon={faInstagram} />
                                                </button> : ''
                                        }
                                        {
                                            value.channelType === "youtube" ?
                                                <button className="btn btn-floating btn-lg btn-ins" type="button">
                                                    < FontAwesomeIcon icon={faYoutube} />
                                                </button> : ''
                                        }
                                    </div>

                                </div>

                            </div>

                        </div>
                    )}


                </div>
            </div>

        </>

    )
}

export default Channel