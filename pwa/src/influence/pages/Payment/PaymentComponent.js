import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import { faPaypal, faCcVisa, faCcMastercard, faCcAmex } from '@fortawesome/free-brands-svg-icons'
import { Nav, InputGroup, FormControl, Button, Form, Row } from 'react-bootstrap';

import './PaymentComponent.css'
class PaymentComponent extends React.Component {
    render() {


        return (

            <div className="payment-influence">
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
                            <p><strong>Note:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. </p>
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
                            <p><strong>Note:</strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. </p>
                        </div>
                    </div>

                </div>








            </div>

        )










    }








}

export default PaymentComponent