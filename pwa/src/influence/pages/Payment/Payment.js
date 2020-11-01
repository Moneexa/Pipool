import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaypal } from '@fortawesome/free-brands-svg-icons'
import { Nav, Form } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';
import config from '../../../config.json';


import './Payment.css'
function Payment() {

    const [loading, setLoading] = useState(false);
    const [paypalId, setPaypalId] = useState("");
    // const [accountEnabled, setAccountEnabled] = useState(false);
    // const [accountUrl, setAccountUrl] = useState(null);

    // this code is for future implementation
    // useEffect(async () => {
    //     setLoading(true);
    //     try {
    //         const { data } = await axios.post(config.apiUrl + '/bank-accounts');
    //         console.log(data);
    //         setAccountUrl(data.url);
    //         if (data && !data.status) {
    //             setAccountEnabled(true);
    //         } else {
    //             setAccountEnabled(false);
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }, [])

    useEffect(() => {
        setLoading(true);
        async function func(){
            try {
                const { data } = await axios.get(config.apiUrl + '/bank-accounts');
                console.log(data);
                setPaypalId(data.paypalId)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        func()
    }, [])

    async function savePaypalId() {
        try {
            setLoading(true);
            await await axios.post(config.apiUrl + '/bank-accounts', { paypalId });
        } catch (error) {
            console.error(error)
        }
        finally {
            setLoading(false)
        }
    }


    return (
        <div className="payment-influence">
            {
                (loading) ? (
                    <div className="loading-overlay d-flex justify-content-center align-items-center">
                        <Spinner size="bg" animation="grow" variant="success" />
                    </div>
                ) : null
            }
            {/* {
                (loading) ? (
                    <div className="loading-overlay d-flex justify-content-center align-items-center">
                        <Spinner size="bg" animation="grow" variant="success" />
                    </div>
                ) : accountEnabled ? (
                    <button onClick={() => updateBankAccount()} type="button" className="btn btn-primary">
                        <FontAwesomeIcon icon={faPaypal} /> Open setup
                    </button>
                ) : (
                    <button onClick={() => updateBankAccount()} type="button" className="btn btn-primary">
                        <FontAwesomeIcon icon={faPaypal} /> Open Dashboard
                    </button>
                )
            } */}
            <div className="card-body p-5">
                <Nav variant="pills" defaultActiveKey="#nav-tab-paypal" className="nav bg-light nav-pills rounded nav-fill mb-3" role="tablist">
                    {/* <Nav.Item className="nav-item">
                        <Nav.Link href="#nav-tab-card" data-toggle="pill">

                            <FontAwesomeIcon icon={faCreditCard} />
                                  Credit Card

                            </Nav.Link>
                    </Nav.Item> */}
                    <Nav.Item className="nav-item">
                        <Nav.Link data-toggle="pill" href="#nav-tab-paypal" >
                            <FontAwesomeIcon icon={faPaypal} />
                                    Paypal
                            </Nav.Link>
                    </Nav.Item>
                    {/* <Nav.Item className="nav-item">
                        <Nav.Link data-toggle="pill" href="#nav-tab-bank">
                            <FontAwesomeIcon icon={faUniversity} />
                                      Bank Transfer

                                </Nav.Link>
                    </Nav.Item> */}
                </Nav>
                <div className="tab-content">
                    {/* <div className="tab-pane fade active show" id="nav-tab-card">
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
                    </div> */}
                    <div className="tab-pane fade active show" id="nav-tab-paypal">

                        <Form.Group controlId="cardUserName">
                            <Form.Label>Your Paypal Id</Form.Label>
                            <Form.Control value={paypalId} onChange={(ev) => setPaypalId(ev.target.value)} type="text" placeholder="" required="" />
                        </Form.Group>
                        <button onClick={() => savePaypalId()} disabled={!paypalId} type="button" className="btn btn-primary">
                            <FontAwesomeIcon icon={faPaypal} />
                            <span>Save Paypal Id</span>
                        </button>
                    </div>
                    {/* <div className="tab-pane fade" id="nav-tab-bank">
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
                    </div> */}
                </div>

            </div>
        </div>

    )

}

export default Payment