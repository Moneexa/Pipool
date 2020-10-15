import React, { useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useForm } from "react-hook-form";
import styles from './CampaignInfo.module.css'
import { Link } from 'react-router-dom'
import { Modal, Form } from 'react-bootstrap'
import CampaignApply from '../CampaignApply/CampaignApply'
function Dos({ list }) {
    return (
        <>
            <div className={styles.bold}>Dos: </div>
            {
                list.map((value, index) => {
                    return (
                        <div key={index} className="pl-3 d-flex align-items-center">
                            <FontAwesomeIcon className="mr-2 text-success" icon={faCheckCircle} />{value}
                        </div>)
                })
            }
        </>)
}
function Donts({ list }) {
    return (
        <>
            <div className={styles.bold}>Don'ts: </div>
            {
                list.map((value, index) => {
                    return (
                        <div key={index} className="pl-3 d-flex align-items-center">
                            <FontAwesomeIcon className="mr-2 text-danger" icon={faTimesCircle} />{value}
                        </div>
                    )
                })
            }
        </>)
}

export default function CampaignInfo({ match }) {

    const campaignId = match.params.id;
    const actv = useStoreState(state => state.influencersCampaigns.actv)
    const getCampaign = useStoreActions(actions => actions.influencersCampaigns.getCampaign)
    const proposalSubmitted = useStoreState(state => state.influencersProposals.proposalSubmitted);
    const checkIfAlreadySubmitted = useStoreActions(actions => actions.influencersProposals.checkIfAlreadySubmitted)
    const report = useStoreActions(actions => actions.influencersCampaigns.report);
    const [flag, setFlag] = useState(false)
    const [pop, setPop] = useState(false);
    const [message, setMessage] = useState("")
    useEffect(() => {
        //setFlag(false)
        console.log(campaignId)
        getCampaign(campaignId)
        checkIfAlreadySubmitted({ campaignId })
    }, [getCampaign, campaignId])
    function handleClick() {
        console.log(flag)
        setFlag(true);
    }
    function reportClick() {
        hidePop()
        console.log(message)
        if (message) {
            report({
                campaign: campaignId,
                message: message,
            })
        }
    }
    function handleMessageChange(e) {
        setMessage(e.target.value)
    }
    function hidePop() {
        setPop(false)
    }
    function showPop() {
        setPop(true)
    }
    console.log(proposalSubmitted)
    return (
        <>
            <Modal show={pop} onHide={hidePop}>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <textarea type="text" value={message} style={{width:"100%", height:"50%"}} onChange={handleMessageChange}></textarea>
                        </Form.Group>
                        <button type="button" className="btn btn-primary px-5 text-white mb-2" onClick={reportClick}>Submit</button>
                    </Form>
                </Modal.Body>
            </Modal>
            <div className={styles.container}>
                <div className={styles.infoContainer}>
                    <h4 className={`mt-2 mx-4 mb-4 ${styles.title}`}>Campagin Description</h4>
                    <div className={`mb-5 ${styles.card}`}>
                        <div className="d-xs-none d-sm-flex">
                            <div className={`flex-grow-1 ${styles.description}`}>
                                <div className="d-flex flex-column">
                                    <div className={styles.heading}>
                                        <h4 className="m-4">{actv.serviceName}</h4>
                                    </div>
                                    <div className="p-4">

                                        <div>
                                            {actv.serviceDescription}
                                        </div>
                                        <hr />
                                        <div>
                                            <div className={`d-inline-block ${styles.bold}`}>Call for action: &nbsp;</div>
                                            <div className="d-inline-block">{actv.callForAction}</div>
                                        </div>
                                        <div>
                                            <div className={styles.bold}>Brief:</div>
                                            <div>&nbsp; &nbsp; &nbsp; &nbsp;{actv.briefInfluencers}</div>
                                        </div>
                                        <hr />
                                        <div>
                                            {(actv.do && actv.do.length > 0) ? <Dos list={actv.do} /> : null}

                                        </div>
                                        <div>
                                            {(actv.dont && actv.dont.length > 0) ? <Donts list={actv.dont} /> : null}
                                        </div>
                                        <div>
                                            {(actv.caption) ? (
                                                <div>
                                                    <div className={`d-inline-block ${styles.bold}`}>Caption: &nbsp;</div>
                                                    {actv.caption}
                                                </div>
                                            ) : null}
                                        </div>
                                        {/* <div >
                                        <p>{actv.productNeed}</p>
                                    </div>
                                    <div className="">
                                        <div className="row">
                                            <p className="ml-3"> Location: <FontAwesomeIcon icon={faMapMarker} />
                                                {actv.location}</p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <p className="ml-3"> Age:{actv.age}</p>
                                    </div>
                                    <div className="">
                                        <p className="ml-3"> Minimum Followers: {actv.minFollowers}</p>
                                    </div>
                                    <div className="">
                                        <p className="ml-3"> Posting Language:{actv.postingLanguages}</p>
                                    </div>
                                    <div className="">
                                        <ul style={{ display: "inline-block" }}>
                                            {actv.interests.map((value, index) => {
                                                return (<li key={index}>{value}</li>)
                                            })}
                               l         </ul>
                                    </div> */}

                                    </div>
                                </div>
                                {/* <form className="row m-3" onSubmit={handleSubmit((values) => {
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

                            </form> */}
                            </div>
                            <div className={`p-4 d-flex flex-column ${styles.buttons}`}>
                                {
                                    proposalSubmitted ? (
                                        <button className={`btn btn-primary px-5 text-white mb-2 ${styles.noWrap}`} disabled>Proposal Submitted</button>
                                    ) :
                                        (
                                            <>
                                                <Link className={`btn btn-primary px-5 text-white mb-2 ${styles.noWrap}`}
                                                    to={`/influencer/campaigns/${campaignId}/apply`}
                                                >Submit Proposal </Link>

                                                <button type="button" className={`btn btn-outline-secondary px-5 ${styles.noWrap}`}>Save Campagin</button>
                                                <button type="button" className={`btn btn-danger px-5 my-2 noWrap`} onClick={showPop}>Report Campagin</button>

                                            </>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>)
}