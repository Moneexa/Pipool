import React from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import {Link} from 'react-router-dom'
function CampaignManager() {
    const campaignList = useStoreState(state => state.influencersCampaigns.campaignList);
    const influencersCampaign = useStoreActions(actions => actions.influencersCampaigns.influencersCampaign);
    useEffect(() => {
        influencersCampaign()
    })
    return (
        <div className="campaigns-influence">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h2 className="m-0 font-weight-bold">Campaigns</h2>
            </div>
            <div className="row">
                {
                    campaignList.map((value, index) => {
                        return (
                            < div id="border" className="col-xl-12 col-lg-12" key={index}>
                                <div className="card shadow mb-4 campaign-item">
                                    <div className="card-body">
                                        <h4 className="font-weight-bold">
                                          <Link to={`/influencer/campaigns/${value._id}`}>
                                            {value.serviceName}
                                            </Link>
                                            </h4>
                                        <p className="text-secondary">
                                            {value.serviceDescription}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>

        </div >
    )

}

export default CampaignManager;