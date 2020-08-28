import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import "./CampaignInvite.css";

export default function CampaignInvite({ match, location }) {
    const campaignId = match.params.id;

    const influencers = useStoreState(state => state.channels.influencers);
    const getInfluencers = useStoreActions(actions => actions.channels.getInfluencers);
    useEffect(() => {
        getInfluencers({ campaignId: campaignId })

    }, [getInfluencers, campaignId])
    return (<div className="campaign-invite">
        <h1 className="mx-4">Suggested Influencers</h1>
        <div className="row">
            {
                influencers.map((value, index) => {
                    return (
                        <div key={index} className="w-100 mx-5 mt-3 influencer-container">
                            <div className="d-flex">
                                <div className="flex-fill">
                                    <h3 style={{color:"#585858"}}>{value.Name}</h3>
                                    <div className="d-flex justify-content-between influencer-sub-heading">
                                        <div><b>Followers:</b> {value.Followers}</div>
                                        <div><b>Platform:</b> {value.Channel}</div>
                                        <div><b>Category:</b>{value.Category}</div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <button type="button" className="btn btn-primary rounded-30 text-white ml-2">Invite Influencer</button>
                                </div>
                            </div>
                        </div>
                        // <div className="col-md-8 col-sm-8" key={index}>
                        //     <p>Name: {value.Name} </p>
                        //     <p>Followers:  {value.Followers} </p>
                        //     <p>ChannelType: {value.Channel} </p>
                        //     <p>Category: {value.Category} </p>
                        // </div>
                        // <div className="col-md-4 col-sm-4"><button type="button" className="btn btn-primary rounded-30 text-white ml-2">Invite Influencer</button></div></>
                    )
                }
                )

            }

        </div>



    </div >)

}