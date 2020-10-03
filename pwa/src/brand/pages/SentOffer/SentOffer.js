import React from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalTitle, Button } from 'react-bootstrap';
import { PayPalButton } from "react-paypal-button-v2";

export default function SentOffer() {
    const offerList = useStoreState(state => state.offer.offerList);
    const toBePayedOffer = useStoreActions(actions => actions.offer.toBePayedOffer)
    const verifyPayment = useStoreActions(actions => actions.offer.verifyPayment)
    const [pop, setPop] = useState(false)
    const [price, setPrice] = useState(0)
    const [offerId, setOfferId] = useState(null);
    useEffect(() => {
        toBePayedOffer()
        //setPop(false)
    }, [])
    const handleClose = () => setPop(false);
    const handleShow = (price, id) => {
        setOfferId(id)
        setPrice(price)
        setPop(true)
    };
    return (<>
        <Modal show={pop} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PayPalButton
                    amount={price}
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={(details, data) => {
                        alert("Transaction completed by " + details.payer.name.given_name);
                        verifyPayment({orderId: data.orderID, offerId})
                    }}
                    options={{
                        clientId: "AZWCOnSDVhD5f3TS4kFhPBN6ynsrQrz-R2whFEcJO0KBgGKfX9VgLFCPYLqYgFtokR0KmShrHE9A27Oo"
                    }}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
          </Button>

            </Modal.Footer>
        </Modal>
        <div className="offers-sent">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">

                <h2 className="m-0 font-weight-bold">Accepted Offers</h2>

            </div>
            {offerList.map((value, index) => {
                return (
                    <div id="border" className="" key={index}>

                        <div className="card shadow mb-4 rounded-20 border-yellow border-5">
                            <div className="card-body">
                                <div className="pb-2" style={{ padding: "0 !important" }}>
                                    <div className="d-flex">
                                        <div className="flex-fill">
                                            <div className="row">
                                                <h3 style={{ color: "#585858" }} className="col-md-5">{value.campaignId.serviceName}</h3>
                                                <h4 style={{ color: "#585858" }} className="col-md-7 d-flex align-items-center">{value.price}</h4>
                                            </div>
                                            <div className="d-flex justify-content-between influencer-sub-heading">
                                                <div><b>Date of Completion:</b> {value.proposal.dateSubmission} </div>
                                                {/* <div><b>Platform:</b> {value.Channel}</div> */}
                                                {/* <div><b>Category:</b>{value.Category}</div> */}
                                            </div>
                                        </div>


                                        <button id="accept" onClick={() => handleShow(value.price, value._id)} className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm btn-primary shadow-sm mr-3">Make Payment</button>

                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>
                )
            })
            }
        </div>
    </>)
}