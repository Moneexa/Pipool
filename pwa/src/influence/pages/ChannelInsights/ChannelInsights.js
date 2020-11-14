import React from 'react';
import '../ChannelManager/ChannelManager.css'

import { InstagramInsights } from './InstagramInsights';
import { FacebookInsights } from './FacebookInsights';
import { YoutubeInsights } from './YoutubeInsights';

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
       
    )
}
export default ChannelInsights
