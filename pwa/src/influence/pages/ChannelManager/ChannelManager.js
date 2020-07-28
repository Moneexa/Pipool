import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ChannelManager.css'
import config from '../../../config.json';

import { useEffect } from 'react';
function Channel() {
    const channels = useStoreState(state => state.channels.channels);
    const listChannels = useStoreActions(actions => actions.channels.listChannels);
    const insights =  useStoreActions(actions=> actions.channels.instaInsights)
    const fbinsights =  useStoreActions(actions=> actions.channels.fbInsights)

    useEffect(() => {
        listChannels();
    }, [])

    const instaInsights=props=> {
        
        console.log(props)
        const channelId=props
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
                insights({token:code, channelId:channelId})
                
            }
        }, 1000);


    }
    const fbInsights=props=> {
        
        console.log(props)
        const channelId=props
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
                fbinsights({token:code, channelId:channelId})
                
            }
        }, 1000);


    }
    return (

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
                                            <button className="btn btn-floating btn-lg btn-fb" type="button" onClick={()=>{fbInsights(value.channelId)}}>
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
                                            <button className="btn btn-floating btn-lg btn-ins" type="button" onClick={()=>{instaInsights(value.channelId)}}>
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



    )
}

export default Channel