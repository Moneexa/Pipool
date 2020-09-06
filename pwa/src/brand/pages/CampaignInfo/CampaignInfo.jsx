import React from 'react';
import { Tabs, Tab } from 'react-bootstrap'
import CampaignInvite from './CampaignInvite/CampaignInvite.js'
import CampaignProposals from './CampaignProposals/CampaignProposals'

export default function CampaignInfo({ match }) {
    return <>
        <Tabs defaultActiveKey="proposals">
            <Tab eventKey="proposals" title="Proposals">
                <CampaignProposals campaignId={match.params.id} />
            </Tab>
            <Tab eventKey="suggestedInvite" title="Suggested Influencers">
                <CampaignInvite campaignId={match.params.id} />
            </Tab>
        </Tabs>
    </>
}