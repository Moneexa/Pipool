import React, { useState, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import config from '../../../config.json';
import CanvasJSReact from '../../../lib/Chart 2.3.2 GA - Stable/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const gapi = window.gapi;
let GoogleAuth = window.GoogleAuth;

function ChannelInsights(props) {
    var SCOPE = 'https://www.googleapis.com/auth/youtube.force-ssl';
    var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';
    const youtube_Insights= useStoreActions(actions => actions.insights.youtubeInsights);
    const impressions = useStoreState(state => state.insights.impressions);
    const instaFollowers = useStoreState(state => state.insights.InstaFollowers);
    const instainsights = useStoreActions(actions => actions.insights.instaInsights)
    const fbinsights = useStoreActions(actions => actions.insights.fbInsights)
    function handleClick() {
        const socialAcc = props.location.pathname.split('/')[3];
        const Id = props.location.pathname.split('/')[4];
        if (socialAcc === "instagram") {
            instaInsights(Id)
        }
        else if (socialAcc === "facebook") {
            fbInsights(Id)
        }
       else if(socialAcc === "youtube"){
           youtubeInsights(Id)
       }
    }
    useEffect(() => {
        gapi.load('client:auth2', initClient);
    }, []);
    function initClient() {
        gapi.client.init({
            'apiKey': config.google.apiKey,
            'clientId': config.google.clientId,
            'discoveryDocs': [discoveryUrl],
            'scope': SCOPE
        }).then(function () {
            GoogleAuth = gapi.auth2.getAuthInstance();
            //setCanSignIn(true)
        });
    }
    async function youtubeInsights(props) {
        const user = await GoogleAuth.signIn();
        gapi.client.setApiKey(config.google.apiKey);
        const channels = await gapi.client.youtube.channels.list({
            mine: true,
            part: 'id,statistics,snippet'
        });
        
        console.log(user.getAuthResponse().access_token)
        youtube_Insights({token:user.getAuthResponse().access_token , Id: props})
    }

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
                instainsights({ token: code, channelId: channelId })
            }
        }, 1000);


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
    return (<div className="channel-insights">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h2 className="m-0 font-weight-bold text-primary">Channel Insights</h2>
            <button type="button" onClick={handleClick}>Fetch insights</button>
        </div>
        <div className="row">
            {
                props.location.pathname.split('/')[3] === "instagram" ?
                    <>
                        <div className="col-md-6">
                            <CanvasJSChart options={instaFollowers} />
                        </div>
                        <div className="col-md-6">
                            <CanvasJSChart options={impressions} />
                        </div>
                    </>
                    : ''
            }
        </div>

    </div>)
}
export default ChannelInsights