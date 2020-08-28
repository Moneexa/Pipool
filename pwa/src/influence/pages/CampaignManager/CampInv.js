import React from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
export default function CampInv({ match }) {
    const campaignId = match.params.id;
    const actv = useStoreState(state => state.campaign.actv)
    const getCampaign = useStoreActions(actions => actions.campaign.getCampaign)
    useEffect(() => {
        console.log(campaignId)
        getCampaign(campaignId)
    }, [getCampaign, campaignId])

    return (<div className="camp-inv">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h2 className="m-0 font-weight-bold">{actv.serviceName}</h2>

        </div>
        <div className="row">
            <div className="col-md-12">
                <p>{actv.serviceDescription}</p>
            </div>
            <div className="col-md-12">
                <p>{actv.callForAction}</p>
            </div>
            <div className="col-md-12">
                <p>{actv.briefInfluencers}</p>
            </div>
            <div className="col-md-6">
                <ol>
                    {actv.do.map(value => {
                        return (<li>{value}</li>)
                    })}
                </ol>
            </div>
            <div className="col-md-6">
                <ol>
                    {actv.dont.map(value => {
                        return (<li>{value}</li>)
                    })}
                </ol>
            </div>
            <div className="col-md-12">
                <p>{actv.productNeed}</p>
            </div>
            <div className="col-md-3">
                <p>{actv.location}</p>
            </div>
            <div className="col-md-3">
                <p>{actv.age}</p>
            </div>
            <div className="col-md-3">
                <p>{actv.minFollowers}</p>
            </div>
            <div className="col-md-3">
                <p>{actv.postingLanguages}</p>
            </div>
            <div className="col-md-12">
                <ol>
                    {actv.interests.map(value => {
                        return (<li>{value}</li>)
                    })}
                </ol>
            </div>

        </div>

    </div>)
}