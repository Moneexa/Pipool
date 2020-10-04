
import React, { useEffect } from 'react'
import './ActiveCampaigns.css';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Table } from 'react-bootstrap'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
export default function ActiveCampaigns() {
    const listActiveCampaigns = useStoreActions(actions => actions.brandsCampaignsModel.listActiveCampaigns);
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
                                <button className="btn btn-primary text-white">Release payment</button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )

}

