import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';

export default function CampaignInvite({ match, location }) {
    const campaign_id = match.params.id;

    const influencers = useStoreState(state => state.channels.influencers);
    const getInfluencers = useStoreActions(actions => actions.channels.getInfluencers);
    useEffect(() => {
        getInfluencers({ campaignId: campaign_id })
        
    }, [])
    return (<div className="campaign-invite">
        <h1>Suggested Influencers</h1>
        <div className="row">
            {
                influencers.map((value,index) => {
                    return (<><div className="col-md-8 col-sm-8" key={index}>
                        <p>Name: {value.Name} </p>
                        <p>Followers:  {value.Followers} </p>
                        <p>ChannelType: {value.Channel} </p>
                        <p>Category: {value.Category} </p>
                    </div>
                        <div className="col-md-4 col-sm-4"><button type="button" className="btn btn-primary rounded-30 text-white ml-2">Invite Influencer</button></div></>
                    )
                }
                )

            }

        </div>



    </div>)

}