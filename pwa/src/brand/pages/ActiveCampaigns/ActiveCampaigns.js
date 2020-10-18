
import React, { useEffect } from 'react'
import './ActiveCampaigns.css';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Table } from 'react-bootstrap'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
export default function ActiveCampaigns() {
    const listActiveCampaigns = useStoreActions(actions => actions.brandsCampaignsModel.listActiveCampaigns);
    const releasePayment = useStoreActions(actions => actions.brandsCampaignsModel.releasePayment);
    const requestForAds = useStoreActions(actions => actions.brandsCampaignsModel.requestForAds);
    const reportForDispute = useStoreActions(actions => actions.brandsCampaignsModel.reportForDispute);
    const list = useStoreState(state => state.brandsCampaignsModel.activeCampaigns);
    console.log(list);


    useEffect(() => {
        listActiveCampaigns();
    }, [listActiveCampaigns]);


    return (
        <div className="campaigns">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h2 className="m-0 font-weight-bold">Campaigns</h2>
            </div>

            <Table striped bordered hover>
                <thead style={{ backgroundColor: "grey", color: "white" }}>
                    <tr >
                        <th>Campaign Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((element, index, array) => {

                        return (<tr key={index} >
                            <td style={{ color: "#ffc809" }}>
                                <Link to={`/brand/campaigns/${element._id}`}>{element.campaignId.serviceName}</Link>
                            </td>
                            <td>
                                <button onClick={() => releasePayment(element.campaignId._id)} className="btn btn-primary text-white">Release payment</button>
                                <button onClick={() => requestForAds(element.campaignId._id)} className="ml-3 btn btn-primary text-white">Request For Ads</button>
                                <button onClick={() => reportForDispute({campaignId: element.campaignId._id, offerId: element._id})} className="ml-3 btn btn-primary text-white">Report For Dispute</button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )

}

