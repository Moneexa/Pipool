import React, { useState } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import config from '../../../config.json';
import CanvasJSReact from '../../../lib/Chart 2.3.2 GA - Stable/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function ChannelInsights(props) {
    const impressions = useStoreState(state => state.insights.impressions);
    const instainsights = useStoreActions(actions => actions.insights.instaImpressionsInsights)
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
            <CanvasJSChart option={impressions} />
        </div>

    </div>)
}
export default ChannelInsights