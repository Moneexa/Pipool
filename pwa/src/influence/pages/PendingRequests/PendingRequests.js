import React from 'react'
// import './PendingRequests.css'
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { useStyles } from 'react-styles-hook'
const style = useStyles({
    accept: {
        background: "#ffc809",
        borderRadius: "30px",
        fontSize: "14px",
        boxShadow: "0 .125rem .25rem 0 rgba(58,59,69,.2)!important",
        border: "none"
    },
    deny: {
        
        width: "20 %",
        fontSize: "14px",
        borderRadius: "30px",
        border: "none"

    },
    seeMore: {
        width: "30%",
        fontSize: "20px",
        borderRadius: "30px",

        background: "#ffc809",
        border: "none",

        boxShadow: "0 .125rem .25rem 0 rgba(58,59,69,.2)!important"
    }

})
function PendingRequests() {
    const _styles = style
    const offerList = useStoreState(state => state.offer.offerList)
    const listOffers = useStoreActions(actions => actions.offer.listOffers);
    const updateOffer = useStoreActions(actions => actions.offer.updateOffer);
    useEffect(
        () => { listOffers() }, []
    )
    function acceptOffer(offerId) {
        updateOffer({ offerId: offerId, acceptanceStatus: "accept" })
    }
    function declineOffer(offerId) {
        updateOffer({ offerId: offerId, acceptanceStatus: "decline" })

    }

    return (

        <div className="pending-requests">

            <div className="d-sm-flex align-items-center justify-content-between mb-4">

                <h2 className="m-0 font-weight-bold">Pending Requests</h2>

            </div>
            {
                offerList.map((value, index) => {
                    return (
                        <div id="border" className="" key={index}>

                            <div className="card shadow mb-4 rounded-20 border-yellow border-5">
                                <div className="card-body">
                                    <div className="pb-2" style={{ padding: "0 !important" }}>
                                        <div className="d-flex align-items-center">
                                            <div className="flex-fill">
                                                <h3 style={{ color: "#585858" }}>{value.campaignId.serviceName}</h3>
                                                <div className="d-flex justify-content-between influencer-sub-heading">
                                                    <div><b>Date of Completion:</b> {value.proposal?.dateOfSubmission}</div>
                                                    {/* <div><b>Platform:</b> {value.Channel}</div> */}
                                                    {/* <div><b>Category:</b>{value.Category}</div> */}
                                                </div>
                                            </div>


                                            <div><button style={_styles.accept} onClick={() => { acceptOffer(value._id) }} id="accept" className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm btn-primary shadow-sm mr-3">Accept</button></div>
                                            <div><button style={_styles.deny} onClick={() => { declineOffer(value._id) }} className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm shadow-sm btn-danger">Deny</button></div>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                    )
                })
            }
            {/* <div id="btn-top" className="mt-4 text-center small" style={{ marginBottom: "50px" }}>

                <button style={_styles.seeMore} className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm btn-primary shadow-sm">See more</button>

            </div> */}
        </div>
    )


}


export default PendingRequests;