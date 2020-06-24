import React, { useState } from 'react'
import { useStyles } from 'react-styles-hook'
import { Tab, Nav } from 'react-bootstrap';
import { Form1 } from './Form1';
import './NewCampaign.css'
import { Form2 } from './Form2';

function NewCampaign() {

    const formSteps = ["one", "two", "three"]
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

    function saveForm(values) {
        setCurrentStepIndex(currentStepIndex + 1);
    }

    return (
        <div className="new-campaign px-lg-2 px-xl-5 bottom-spacer">
            <div className="text-center">
                <h1 style={{ color: "#3a3b45!important" }} className="h4 text-gray-900 mb-4">CREATE A CAMPAIGN</h1>
                <p>Describe your product or service to the influencers.</p>
            </div>
            <div className="user">
                <Tab.Container activeKey={formSteps[currentStepIndex]} defaultActiveKey={formSteps[currentStepIndex]}>
                    <Tab.Content>
                        <Tab.Pane eventKey={formSteps[0]} className="mb-5">
                            <Form1 onNext={saveForm} />
                        </Tab.Pane>
                        <Tab.Pane eventKey={formSteps[1]}>
                            <Form2 onNext={saveForm} />
                        </Tab.Pane>
                        <Tab.Pane eventKey={formSteps[2]}>
                            <div className="form-group row" >
                                <div className="form-group col-sm-2 mb-3 mb-sm-0">
                                </div>
                                <div className="form-group col-sm-8 mb-3 mb-sm-0">
                                    <p style={{ fontSize: "22px", textAlign: "center" }}> Here you can set the criteria that will define the selection of influencers to whom your campaign will be visible to. Interested influencers will then send you post proposals for approval. </p>                    </div>
                                <div className="form-group col-sm-2 mb-3 mb-sm-0">
                                </div>


                            </div>
                            <div className="form-group row" >
                                <div className="form-group col-sm-6 mb-3 mb-sm-0">
                                    <label>Gender</label>
                                    <select className="browser-default custom-select" id="gender" name="gender">
                                        <option value="1">Any</option>
                                        <option value="2">Male</option>
                                        <option value="3">Female</option>
                                    </select>
                                </div>
                                <div className="form-group col-sm-6 mb-3 mb-sm-0">
                                    <label>Location</label>
                                    <select className="browser-default custom-select" id="location" name="location">
                                        <option value="1">Region</option>
                                        <option value="2">Northern America</option>
                                        <option value="3">Western Europe</option>
                                        <option value="3">Eastern Europe</option>
                                        <option value="3">Australia and New Zealand</option>
                                        <option value="3">Asia</option>
                                    </select>


                                </div>
                            </div>

                            <div className="form-group row" >
                                <div className="form-group col-sm-6 mb-3 mb-sm-0">
                                    <label>Age</label><br />
                                    <input type="range" min="1" max="100" value="50" className="slider" id="myRange" />
                                </div>
                                <div className="form-group col-sm-6 mb-3 mb-sm-0">
                                    <label>Posting languages</label>
                                    <select className="browser-default custom-select" id="location" name="location">
                                        <option value="1">English</option>
                                        <option value="2">French</option>
                                        <option value="3">Spanish</option>
                                        <option value="3">Italian</option>
                                        <option value="3">Chinese</option>
                                        <option value="3">Portuguese</option>
                                        <option value="3">Russian</option>
                                        <option value="3">German</option>
                                    </select>


                                </div>
                            </div>
                            <div className="form-group row" >
                                <div className="form-group col-sm-6 mb-3 mb-sm-0">
                                    <label>Minimum number of followers </label><br />
                                    <input type="range" min="1" max="100" value="50" className="slider" id="myRange" />
                                </div>
                            </div>

                            <div className="form-group row" >
                                <hr style={{ border: "1px solid #f0f0f0 !important", width: "100%" }} />
                            </div>

                            <div className="form-group row" >
                                <div className="form-group col-sm-12 mb-3 mb-sm-0">
                                    Include influencers with interests in :
                                </div>
                            </div>
                            <div className="form-group row" >
                                <div id="img_row" className="form-group col-sm-12 mb-3 mb-sm-0">
                                    <div className="clearfix">
                                        <button className="select select-button">SELECT ALL</button>

                                        <button className="check-mark send"  data-counter="0">✔</button>
                                    </div>
                                    <ul className="pl-0 ul">
                                        <li className="li"><img alt="" src="https://farm8.staticflickr.com/7326/11287113923_57d37ed9d3_q.jpg" /></li>
                                        <li className="li"><img alt="" src="https://farm9.staticflickr.com/8184/8095683964_9e27753908_q.jpg" /></li>
                                        <li className="li"><img alt="" src="https://farm9.staticflickr.com/8171/8018956825_67bf62c098_q.jpg" /></li>
                                        <li className="li"><img alt="" src="https://farm9.staticflickr.com/8425/7587724752_cdb9f0c444_q.jpg" /></li>
                                        <li className="li"><img alt="" src="https://farm8.staticflickr.com/7248/7587738254_707a32f27b_q.jpg" /></li>
                                        <li className="li"> <img alt="" src="https://farm9.staticflickr.com/8191/8095680852_893f685cbd_q.jpg" /></li>
                                        <li className="li"><img alt="" src="https://farm9.staticflickr.com/8460/8018953043_c6ef9e3b29_q.jpg" /></li>
                                        <li className="li"><img alt="" src="https://farm9.staticflickr.com/8026/7445019824_914dea4ac3_q.jpg" /></li>
                                        <li className="li"><img alt="" src="https://farm8.staticflickr.com/7088/7332137562_14956827a7_q.jpg" /></li>
                                        <li className="li"><img alt="" src="https://farm8.staticflickr.com/7108/7151306497_9cfb1a367b_q.jpg" /></li>
                                        <li className="li"><img alt="" src="https://farm6.staticflickr.com/5198/7005209880_432389ef25_q.jpg" /></li>
                                        <li className="li"><img alt="" src="https://farm8.staticflickr.com/7280/7151302883_e6ef32f04d_q.jpg" /></li>
                                    </ul>
                                </div>
                            </div>

                        </Tab.Pane>
                    </Tab.Content>
                    <div className="navigation-buttons d-flex justify-content-center">
                        {
                            (currentStepIndex > 0) ?
                                <Nav.Link 
                                eventKey={formSteps[currentStepIndex - 1]} 
                                onClick={() => setCurrentStepIndex(currentStepIndex - 1)} 
                                className="btn btn-secondary btn-user text-white next-button">
                                    Previous
                                </Nav.Link> : null
                        }
                        {
                            (currentStepIndex < (formSteps.length - 1)) ?
                                <Nav.Link 
                                eventKey={formSteps[currentStepIndex + 1]} 
                                onClick={() => {setCurrentStepIndex(currentStepIndex + 1)}} 
                                className="btn btn-primary btn-user text-white next-button">
                                    Next
                                </Nav.Link> : null
                        }
                    </div>
                </Tab.Container>
            </div>
        </div>

    )
}
export default NewCampaign;