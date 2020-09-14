import { faChevronLeft, faChevronRight, faTachometerAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Nav, Form } from "react-bootstrap";
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from "react-router-dom";
import './Influencer.css';
import Calender from './pages/Calender/Calender';
import PastCampaignFeedback from './pages/PastCampaignFeedback/PastCampaignFeedback';
import AddChannel from './pages/AddChannel/AddChannel';
import ChannelManager from './pages/ChannelManager/ChannelManager';
import CampaignManager from './pages/CampaignManager/CampaignManager';
import Overview from './pages/Overview/Overview';
import PendingRequests from './pages/PendingRequests/PendingRequests';
import Help from './pages/Help/Help';
import Payment from './pages/Payment/Payment';
import ChannelInsights from './pages/ChannelInsights/ChannelInsights'
import CampaignInfo from './pages/CampaignInfo/CampaignInfo'
import CampaignApply from './pages/CampaignApply/CampaignApply'
<<<<<<< HEAD
import CampaignChat from './pages/CampaignChat/CampaignChat'
=======
import { useStoreActions, useStoreState } from 'easy-peasy';
>>>>>>> ab519ba091b5951c82685426c424b0dd52ca90cd
//import store from "./shared/store/store"

export function Influencer({ match }) {
    const channels = useStoreState(state => state.channels.channels);
    const listChannels = useStoreActions(actions => actions.channels.listChannels);
    const setActiveChannelId = useStoreActions(actions => actions.channels.setActiveChannelId);
    const activeChannel = useStoreState(state => state.channels.activeChannelId);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [sidebarOpened, setSidebarOpened] = useState(false);

    function toggleSidebar() {
        setSidebarOpened(!sidebarOpened);
    }

    useEffect(() => {
        listChannels();
    }, []);

    return (
        <div className="dashboard-influence">
            {
                sidebarOpened ? <div className="sidebar-overlay" onClick={() => toggleSidebar()}></div> : null
            }
            <div id="wrapper">
                <div className="d-flex">
                    <Router>
                        <div className={"sidebar " + (sidebarExpanded ? "" : "collapsed") + " " + (sidebarOpened ? "opened" : "")}>
                            <Link to={match.path} className="sidebar-brand d-flex align-items-center justify-content-center" style={{ marginTop: "20px", marginBottom: "30px" }}>
                                <img alt="" src="../img/logo.jpg" />
                                <div className="sidebar-brand-icon rotate-n-15">
                                </div>
                            </Link>

                            <Nav className="d-md-block bg-yello"
                                activeKey="/influence-home">
                                <div className="sidebar-sticky"></div>
                                <Nav.Item>
                                    <Nav.Link as={Link} to={`${match.path}/overview`} className={!sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                        <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                        {sidebarExpanded ? <span>&nbsp;</span> : null}
                                        <span>Dashboard</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>

                                    <Nav.Link as={Link} to={`${match.path}/channels`} className={!sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                        <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                        {sidebarExpanded ? <span>&nbsp;</span> : null}
                                        <span>Channel Manager</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={Link} to={`${match.path}/add-channels`} className={!sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                        {sidebarExpanded ? <div className="no-icon-space"></div> : null}
                                        {sidebarExpanded ? <span>&nbsp;</span> : null}
                                        <span>Add New Channel</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={Link} to={`${match.path}/campaigns`} className={!sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                        <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                        {sidebarExpanded ? <span>&nbsp;</span> : null}
                                        <span>Campaigns</span>
                                    </Nav.Link>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to={`${match.path}/pending-requests`} className={!sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                            {sidebarExpanded ? <div className="no-icon-space"></div> : null}
                                            {sidebarExpanded ? <span>&nbsp;</span> : null}
                                            <span>Pending Requests</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Link as={Link} to={`${match.path}/campaign-feedbacks`} className={!sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                        {sidebarExpanded ? <div className="no-icon-space"></div> : null}
                                        {sidebarExpanded ? <span>&nbsp;</span> : null}
                                        <span>Past Campaign Feebdbacks</span>
                                    </Nav.Link>
                                    <Nav.Link className={!sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                        {sidebarExpanded ? <div className="no-icon-space"></div> : null}
                                        {sidebarExpanded ? <span>&nbsp;</span> : null}
                                        <span>See Previous Campaings</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>

                                    <Nav.Link as={Link} to={`${match.path}/calender`} className={!sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>

                                        <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />

                                        {sidebarExpanded ? <span>&nbsp;</span> : null}

                                        <span>Calender</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>

                                    <Nav.Link as={Link} to={`${match.path}/payment`} className={!sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                        <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                        {sidebarExpanded ? <span>&nbsp;</span> : null}
                                        <span>Settings and Payments</span> </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>

                                    <Nav.Link as={Link} to={`${match.path}/help`} className={!sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                        <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                        {sidebarExpanded ? <span>&nbsp;</span> : null}
                                        <span>Help and FAQ</span> </Nav.Link>
                                </Nav.Item>
                            </Nav>

                            <div className="collapse-button-container d-flex justify-content-center">
                                <div
                                    onClick={() => {
                                        if (sidebarOpened) {
                                            setSidebarOpened(!sidebarOpened);
                                        }
                                        else {
                                            setSidebarExpanded(!sidebarExpanded)
                                        }
                                    }}
                                    className="collapse-button d-flex justify-content-center align-items-center rounded-circle"
                                >

                                    <FontAwesomeIcon icon={sidebarExpanded ? faChevronLeft : faChevronRight} />
                                </div>
                            </div>

                        </div>
                        <div className="sidebar-content">
                            <nav className="navbar navbar-expand-lg navbar-light shadow-sm py-3 mb-4">
                                <FontAwesomeIcon className="d-lg-none" icon={faBars} onClick={() => toggleSidebar()} />
                                <div className="my-2 my-0 mr-auto">
                                    <ul className="navbar-nav">
                                        <li className="nav-item mr-4">
                                            <Form.Control as="select" value={activeChannel} onChange = {(event) => setActiveChannelId(event.target.value)}>
                                                <option disabled value="">Select Channel</option>
                                                {
                                                    channels.map((value, index) =>
                                                        <option key={index} value={value._id}>{value.channelName}</option>
                                                    )
                                                }
                                            </Form.Control>

                                        </li>
                                    </ul>
                                </div>
                                <div className="my-2 my-0 ml-auto">
                                    <ul className="navbar-nav">
                                        <li className="nav-item mr-4">
                                            <Link className="nav-link font-weight-bold text-primary text-uppercase" to="/home">Home</Link>
                                        </li>
                                        <li className="nav-item mr-4">
                                            <Link className="nav-link font-weight-bold text-primary text-uppercase" to="/home">Profile</Link>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                            <div className="container-fluid">
                                <Switch>
                                    <Redirect from={`${match.path}/`} exact to={`${match.path}/overview`} />
                                    <Route path={`${match.path}/overview`} component={Overview} />
                                    <Route path={`${match.path}/campaigns`} exact={true} component={CampaignManager} />
                                    <Route path={`${match.path}/pending-requests`} component={PendingRequests} />
                                    <Route path={`${match.path}/channels`} exact={true} component={ChannelManager} />
                                    <Route path={`${match.path}/add-channels`} component={AddChannel} />
                                    <Route path={`${match.path}/campaign-feedbacks`} component={PastCampaignFeedback} />
                                    <Route path={`${match.path}/calender`} component={Calender} />
                                    <Route path={`${match.path}/payment`} component={Payment} />
                                    <Route path={`${match.path}/help`} component={Help} />
                                    <Route path={`${match.path}/channels/:id/insights`} exact={true} component={ChannelInsights} />
                                    <Route path={`${match.path}/campaigns/:id`} exact={true} component={CampaignInfo} />
                                    <Route path={`${match.path}/campaigns/:id/apply`} exact={true} component={CampaignApply} />

                                </Switch>

                            </div>
                        </div>
                    </Router>
                </div>
            </div >
        </div >
    )
}