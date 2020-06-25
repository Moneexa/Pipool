import React, { useEffect } from 'react'
import './CampaignManager.css';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Table } from 'react-bootstrap'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function CompaignManager() {
    const listCampaigns = useStoreActions(actions => actions.campaign.listCampaign);
    const list = useStoreState(state => state.campaign.campaignList);


    useEffect(() => {
        listCampaigns();
    }, []);


    return (
        <div className="campaigns">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h2 className="m-0 font-weight-bold">Campaigns</h2>
            </div>

            <Table striped bordered hover>
                <thead style={{backgroundColor:"grey", color:"white"}}>
                    <tr >
                        <th>Service Name</th>
                        <th>Total Reach</th>
                        <th>Messages</th>
                        <th>Pending Review</th>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Total budget</th>
                        <th>Consumed</th>
                        <th>Editing actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((element, index, array) => {

                        return (<tr key={index} >
                            <td style={{color:"#ffc809"}}>{element.serviceName}</td>
                            <td>0</td>
                            <td>0</td>
                            <td><span>0</span></td>
                            <td>25/6/2020</td>
                            <td>25/6/2020</td>
                            <td>$0</td>
                            <td>0%</td>
                            <td><FontAwesomeIcon icon={faEdit} /></td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )

}

