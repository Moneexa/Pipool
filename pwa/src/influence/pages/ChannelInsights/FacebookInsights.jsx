import React, { useEffect } from 'react';
import config from '../../../config.json';
import { useStoreActions, useStoreState } from 'easy-peasy';
import CanvasJSReact from '../../../lib/Chart 2.3.2 GA - Stable/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export function FacebookInsights({ channelId }) {
    const fbInsights = useStoreActions(actions => actions.insights.fbInsights)
    const insights = useStoreState(state => state.insights.facebook);
    function fetchInsights() {
        const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
        const oauthWindow = window.open(encodeURI(`${config.facebookPagesInsights.uri}/?redirect_uri=${host}${config.facebookPagesInsights.redirectURI}&client_id=${config.facebookPagesInsights.appId}&scope=${config.facebookPagesInsights.scope}&response_type=token&state={"{st=state123abc,ds=123456789}"}`));

        var timer = setInterval(function () {
            if (oauthWindow.closed) {
                clearInterval(timer);
                const redirectUrl = new URL(localStorage.getItem('oAuthRedirectUrl').replace('?#', '?'));
                const searchParams = redirectUrl.searchParams;
                console.log(searchParams);

                const code = searchParams.get('access_token');
                console.log(code)

                fbInsights({ token: code, channelId: channelId })
            }
        }, 1000);


    }
    return (
        <div className="channel-insights">
            <button onClick={() => fetchInsights()} className="btn btn-primary rounded-30 text-white">Fetch Insights</button>
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