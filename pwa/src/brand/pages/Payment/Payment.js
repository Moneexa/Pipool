import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { useStoreActions, useStoreState } from 'easy-peasy';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import { faPaypal, faCcVisa, faCcMastercard, faCcAmex } from '@fortawesome/free-brands-svg-icons'
import { Nav, InputGroup, FormControl, Button, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config.json';
import { loadStripe } from '@stripe/stripe-js';
import './Payment.css'
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HUsxfF8ao4ESfFgbwsKhUh3bJ4HUkeZbdrubMhGFCaSZYDFxaavzi11p2XUS48r5knWnhOARRgpK7G36DMtRrIJ008GzBLwN8');

function Payment() {
    const loading = useStoreState(state => state.customer.loading);
    const paymentVerified = useStoreState(state => state.customer.paymentVerified);
    const verifyPayment = useStoreActions(actions => actions.customer.verifyPayment);

    useEffect(() => {
        verifyPayment();
    }, [])

    function addBankAccount() {
        // createAccount();
        const { data } = axios.post(config.apiUrl + '/bank-accounts');
        console.log(data);
    }

    // addCardInformation() {
    //     const { data } = axios.post(config.apiUrl + '/customers/session');
    //     console.log(data);
    // }

    const addCardInformation = async (event) => {
        // Call your backend to create the Checkout session.
        const { data } = await axios.post(config.apiUrl + '/customers/session');
        // When the customer clicks on the button, redirect them to Checkout.
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            sessionId: data.sessionId,
        });
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
    };
    return (

        <div className="payment">
            <button onClick={() => addBankAccount()} type="button" className="btn btn-primary">
                <FontAwesomeIcon icon={faPaypal} />Log in my Paypal
                </button>
            <button disabled={!paymentVerified || loading} onClick={() => addCardInformation()} type="button" className="btn btn-primary">
                <FontAwesomeIcon icon={faPaypal} />Add Credit Card
                </button>
            <div className="card-body p-5">
                <Nav variant="pills" defaultActiveKey="#nav-tab-card" className="nav bg-light nav-pills rounded nav-fill mb-3" role="tablist">
                    <Nav.Item className="nav-item">
                        <Nav.Link href="#nav-tab-card" data-toggle="pill">

                            <FontAwesomeIcon icon={faCreditCard} />
                                  Credit Card

                            </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-item">
                        <Nav.Link data-toggle="pill" href="#nav-tab-paypal" >
                            <FontAwesomeIcon icon={faPaypal} />
                                    Paypal

                            </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="nav-item">
                        <Nav.Link data-toggle="pill" href="#nav-tab-bank">
                            <FontAwesomeIcon icon={faUniversity} />
                                      Bank Transfer

                                </Nav.Link>
                    </Nav.Item>


                </Nav>

                <div className="tab-content">
                    <div className="tab-pane fade active show" id="nav-tab-card">
                        <p className="alert alert-success">Some text success or error</p>

                        <Form>
                            <Form.Group controlId="cardUserName">
                                <Form.Label>Full name (on the card)</Form.Label>
                                <Form.Control type="text" placeholder="" required="" />

                            </Form.Group>
                            <Form.Group controlId="cardNumber">
                                <Form.Label>Card Number</Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl
                                        placeholder=""
                                        name="cardNumber"
                                        type="number"
                                    />
                                    <InputGroup.Append>
                                        <span className="input-group-text text-muted">

                                            <FontAwesomeIcon icon={faCcVisa} />
                                                 &nbsp;
                                                 <FontAwesomeIcon icon={faCcAmex} />
                                                  &nbsp;
                                                <FontAwesomeIcon icon={faCcMastercard} />
                                        </span>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Form.Group>
                            <Row>
                                <Form.Group controlId="expiration" className="col-md-8">
                                    <Form.Label>Expiration</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control placeholder="MM" name="" type="number" />
                                        <Form.Control placeholder="YY" name="" type="number" />

                                    </InputGroup>

                                </Form.Group>
                                <Form.Group controlId="cVV" className="col-md-4">
                                    <Form.Label>CVV</Form.Label>
                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                    <Form.Control type="number" placeholder="" required="" />

                                </Form.Group>
                            </Row>
                            <Button className="subscribe btn btn-primary btn-block" type="submit" value="submit"> Confirm  </Button>


                        </Form>



                    </div>
                    <div className="tab-pane fade" id="nav-tab-paypal">
                        <p>Paypal is easiest way to pay online</p>
                        <p>
                            <button type="button" className="btn btn-primary">
                                <FontAwesomeIcon icon={faPaypal} />
                                        Log in my Paypal
                                </button>
                        </p>
                        <p><strong>Note:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    </div>
                    <div className="tab-pane fade" id="nav-tab-bank">
                        <p>Bank accaunt details</p>
                        <dl className="param">
                            <dt>BANK: </dt>
                            <dd> THE WORLD BANK</dd>
                        </dl>
                        <dl className="param">
                            <dt>Accaunt number: </dt>
                            <dd> 12345678912345</dd>
                        </dl>
                        <dl className="param">
                            <dt>IBAN: </dt>
                            <dd> 123456789</dd>
                        </dl>
                        <p><strong>Note:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Payment