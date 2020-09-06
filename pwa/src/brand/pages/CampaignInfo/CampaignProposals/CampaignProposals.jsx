import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';

export default function CampaignProposals({campaignId}) {
    const proposalsList = useStoreState(state => state.brandsProposals.campaignProposals);
    const getCampaignProposals = useStoreActions(actions => actions.brandsProposals.getCampaignProposals);
    useEffect(() => {
        getCampaignProposals(campaignId)
    }, [getCampaignProposals, campaignId])
    return (<div className="campaign-invite">
        <div className="row">
            {
                proposalsList.map((value, index) => {
                    return (
                        <div key={index} className="w-100 mx-5 mt-3 influencer-container">
                            <div className="d-flex">
                                <div className="flex-fill">
                                    <h3 style={{ color: "#585858" }}>{value.createdBy.fullName}</h3>
                                    <div className="d-flex justify-content-between influencer-sub-heading">
                                        <div><b>Date of Completion:</b> {value.dateOfSubmission}</div>
                                        {/* <div><b>Platform:</b> {value.Channel}</div> */}
                                        {/* <div><b>Category:</b>{value.Category}</div> */}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <button type="button" className="btn btn-primary rounded-30 text-white ml-2 px-4">Chat</button>
                                </div>
                            </div>
                        </div>
                    )
                }
                )

            }

        </div>



    </div >)
}