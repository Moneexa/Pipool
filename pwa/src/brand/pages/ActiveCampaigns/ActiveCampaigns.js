
import React, { useEffect, useState } from 'react'
import './ActiveCampaigns.css';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Table } from 'react-bootstrap'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Modal, ModalBody, ModalFooter, ModalTitle, Button } from 'react-bootstrap';
export default function ActiveCampaigns() {
    const listActiveCampaigns = useStoreActions(actions => actions.brandsCampaignsModel.listActiveCampaigns);
    const releasePayment = useStoreActions(actions => actions.brandsCampaignsModel.releasePayment);
    const requestForAds = useStoreActions(actions => actions.brandsCampaignsModel.requestForAds);
    const list = useStoreState(state => state.brandsCampaignsModel.activeCampaigns);
    const [showDisputedModal, setShowDisputedModal] = useState(false);
    const [disputedData, setDisputedData] = useState({});

    console.log(list);


    useEffect(() => {
        listActiveCampaigns();
    }, [listActiveCampaigns]);

    function onDispute(data) {
        setDisputedData(data)
        setShowDisputedModal(true);
    }


    return (
        <div className="campaigns">
            <DisputeDialog show={showDisputedModal} setShowDisputedModal={setShowDisputedModal} disputedData={disputedData} />
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
                                <button onClick={() => onDispute({campaignId: element.campaignId._id, offerId: element._id})} className="ml-3 btn btn-primary text-white">Report For Dispute</button>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )

}


function DisputeDialog({show, setShowDisputedModal, disputedData}) {
    const reportForDispute = useStoreActions(actions => actions.brandsCampaignsModel.reportForDispute);
    if(!show) return null;
    return (
        <Modal show={show} onHide={() => setShowDisputedModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Write your issue</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <textarea style={{borderRadius: 5, width: "100%", borderColor: "#ccc"}} rows={10}></textarea>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{color: 'white'}} variant="primary" onClick={() => reportForDispute(disputedData)}>
                    Report
          </Button>

            </Modal.Footer>
        </Modal>
    )
}