import React,{useEffect} from 'react';
import config from '../../../config.json';
import { useStoreActions, useStoreState } from 'easy-peasy';
import CanvasJSReact from '../../../lib/Chart 2.3.2 GA - Stable/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var gapi = window.gapi;
var GoogleAuth = window.GoogleAuth;
export function YoutubeInsights({ channelId }) {

    var SCOPE = 'https://www.googleapis.com/auth/yt-analytics.readonly';
    var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';

    const youtube_Insights = useStoreActions(actions => actions.insights.youtubeInsights);
    const insights =  useStoreState(state => state.insights.youtube);
    useEffect(() => {
        gapi.load('client:auth2', initClient);
    }, []);
    async function fetchInsights() {
        const user = await GoogleAuth.signIn();
        gapi.client.setApiKey(config.google.apiKey);
        const channels = await gapi.client.youtube.channels.list({
            mine: true,
            part: 'id,statistics,snippet'
        });

        console.log(user.getAuthResponse().access_token)
        youtube_Insights({ token: user.getAuthResponse().access_token, Id: channelId })
    }
    function initClient() {
        gapi.client.init({
            'apiKey': config.google.apiKey,
            'clientId': config.google.clientId,
            'discoveryDocs': [discoveryUrl],
            'scope': SCOPE
        }).then(function () {
            GoogleAuth = gapi.auth2.getAuthInstance();
        });
    }


    return (
        <div className="channel-insights">
            <button onClick={()=>fetchInsights()} className="btn btn-primary rounded-30 text-white">Fetch Insights</button>
            <div className="row">
                {
                    insights.map((value, index) => {
                        return <CanvasJSChart key={index} options={value} />
                    })
                }
            </div>
        </div>

    )
}