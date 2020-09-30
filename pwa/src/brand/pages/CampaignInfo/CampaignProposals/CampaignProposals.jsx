import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function CampaignProposals({ campaignId }) {
    const proposalsList = useStoreState(state => state.brandsProposals.campaignProposals);
    const activeBrandId = useStoreState(state => state.brand.activeBrandId);
    const getCampaignProposals = useStoreActions(actions => actions.brandsProposals.getCampaignProposals);
    const createChat = useStoreActions(actions => actions.chats.createChat);
    const createOffer = useStoreActions(actions => actions.offer.createOffer);
    const  loading = useStoreState(state => state.offer.loading);
    const [pckage, setPckage] = useState("")
    useEffect(() => {
        getCampaignProposals(campaignId)

    }, [getCampaignProposals, campaignId])

    function makeOffer(payload, channelId) {
        createOffer({
            acceptanceStatus: "pending",
            proposal: payload,
            channelId: channelId,
            campaignId: campaignId,
            brandId: localStorage.getItem("activeBrandId")

        })
    }
    function handleChange(e) {
        setPckage(e.target.value)
    }

    return (<div className="campaign-invite">
        <div className="row">
            {
                proposalsList.map((value, index) => {
                    return (
                        <div key={index} className="w-100 mx-5 mt-3 influencer-container">
                            <div className="d-flex">
                                <div className="flex-fill">
                                    <h3 style={{ color: "#585858" }}>{value.channelId.channelName}</h3>
                                    <div className="d-flex justify-content-between influencer-sub-heading">
                                        <div><b>Date of Completion:</b> {value.dateOfSubmission}</div>
                                        {/* <div><b>Platform:</b> {value.Channel}</div> */}
                                        {/* <div><b>Category:</b>{value.Category}</div> */}
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <select className="form-control" style={{ "borderRadius": "2rem" }} value={pckage}
                                                onChange={
                                                    handleChange
                                                }
                                            >
                                                <option disabled="" value="">
                                                    Select package
                                                </option>
                                                <option value={`Basic ${value.channelId.basicPrice}$`}>
                                                    Basic  - {value.channelId.basicPrice}$
                                                </option>
                                                <option value={`Standard ${value.channelId.standardPrice}$`}>
                                                    Standard - {value.channelId.standardPrice}$
                                                </option>
                                                <option value={`Premium ${value.channelId.premiumPrice}$`}>
                                                    Premium  - {value.channelId.premiumPrice}$
                                                </option>

                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <FontAwesomeIcon icon={faArrowAltCircleRight} onClick={()=>{
                                                makeOffer({
                                                    dateSubmission: value.dateOfSubmission,
                                                    name: value.channelId.channelName,
                                                    package: pckage
                                                }, value.channelId._id
                                                )
                                            }} />

                                        </div>
                                        <div className="col-md-5">
                                            <button onClick={() => createChat({ campaignId, channelId: value.channelId, brandId: activeBrandId })} type="button" className="btn btn-primary rounded-30 text-white ml-2 px-4">Chat</button>
                                        </div>
                                    </div>
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