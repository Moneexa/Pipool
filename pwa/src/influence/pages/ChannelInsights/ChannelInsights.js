import React, { useState, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import config from '../../../config.json';
import '../ChannelManager/ChannelManager.css'

import CanvasJSReact from '../../../lib/Chart 2.3.2 GA - Stable/canvasjs.react';
import { InstagramInsights } from './InstagramInsights';
import { FacebookInsights } from './FacebookInsights';
import { YoutubeInsights } from './YoutubeInsights';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function ChannelInsights({ match, location }) {
    const id = match.params.id;
    const insightsType = new URLSearchParams(location.search).get('ctype');
   
    function getInsightComponent() {
        switch (insightsType) {
            default:
                return <div>Oops you landed on wrong url</div>;
            case 'instagram':
                return <InstagramInsights channelId={id}/>
            case 'youtube':
                return <YoutubeInsights channelId={id}/>;
            case 'facebook':
                return <FacebookInsights channelId={id}/>
        }
    }
    return (
        <div>
            { getInsightComponent() }
        </div>
        // <div className="channel-insights">
        //     <div className="d-sm-flex align-items-center justify-content-between mb-4">
        //         <h2 className="m-0 font-weight-bold text-primary">Channel Insights</h2>
        //         <button type="button" onClick={handleClick}>Fetch insights</button>
        //     </div>
        //     <div className="row">
        //         {
        //             props.location.pathname.split('/')[3] === "instagram" ?
        //                 <>
        //                     <div className="col-md-6">
        //                         <CanvasJSChart options={instaFollowers} />
        //                     </div>
        //                     <div className="col-md-6">
        //                         <CanvasJSChart options={impressions} />
        //                     </div>
        //                 </>
        //                 : ''
        //         }
        //     </div>

        // </div>
    )
}
export default ChannelInsights