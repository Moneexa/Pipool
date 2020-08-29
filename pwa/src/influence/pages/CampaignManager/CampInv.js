import React from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useForm } from "react-hook-form";

export default function CampInv({ match }) {
    const { register, handleSubmit, errors } = useForm()

    const campaignId = match.params.id;
    const actv = useStoreState(state => state.campaign.actv)
    const getCampaign = useStoreActions(actions => actions.campaign.getCampaign)
    const postProposals = useStoreActions(actions => actions.proposals.postProposals);
    const proposals = useStoreState(state => state.proposals.actv)
    useEffect(() => {
        console.log(campaignId)
        getCampaign(campaignId)
    }, [getCampaign, campaignId])
    function onNext(values) {
        postProposals({ campaignId: campaignId, proposal: values.serviceDescription, cost: "", dateOfSubmission: "" })

    }
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
                <ul>
                    {actv.do.map(value => {
                        return (<li>{value}</li>)
                    })}
                </ul>
            </div>
            <div className="col-md-6">
                <ul>
                    {actv.dont.map(value => {
                        return (<li>{value}</li>)
                    })}
                </ul>
            </div>
            <div className="col-md-12">
                <p>{actv.productNeed}</p>
            </div>
            <div className="col-md-3">
                <div className="row">
                    <p className="ml-3"> Location: <FontAwesomeIcon icon={faMapMarker} />
                        {actv.location}</p>
                </div>
            </div>
            <div className="col-md-3">
                <p className="ml-3"> Age:{actv.age}</p>
            </div>
            <div className="col-md-3">
                <p className="ml-3"> Minimum Followers: {actv.minFollowers}</p>
            </div>
            <div className="col-md-3">
                <p className="ml-3"> Posting Language:{actv.postingLanguages}</p>
            </div>
            <div className="col-md-12">
                <ul style={{ display: "inline-block" }}>
                    {actv.interests.map(value => {
                        return (<li>{value}</li>)
                    })}
                </ul>
            </div>

        </div>
        <form className="row m-3" onSubmit={handleSubmit((values) => {
            onNext(values)
        })}>

            <label>Write Proposal</label>
            <textarea

                className="form-control form-control-user first-form p-3 m-3"
                rows="30"
                ref={register({ required: true })}

                name="serviceDescription"
                placeholder="Describe your product or service as if your audience is new to it. On the next steps, you'll be able to describe the content you'd like from our influencers. ">
            </textarea>
            <button type="submit" className="btn btn-primary btn-user text-white next-button m-3">Submit Proposal</button>

        </form>


    </div>)
}