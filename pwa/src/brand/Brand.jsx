import { faChevronLeft, faChevronRight, faTachometerAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Nav, Form } from "react-bootstrap";
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from "react-router-dom";
import AddBrand from './pages/AddBrand/AddBrand';
import BrandManager from './pages/BrandManager/BrandManager';
import Calender from './pages/Calender/Calender';
import NewCampaign from './pages/NewCampaign/NewCampaign';
import CampaignManager from './pages/CampaignManager/CampaignManager';
import Overview from './pages/Overview/Overview';
import PendingRequests from './pages/PendingRequests/PendingRequests';
import Help from './pages/Help/Help';
import Payment from './pages/Payment/Payment';
import CampaignInvite from './pages/CampaignInfo/CampaignInvite/CampaignInvite'
import './Brand.css';
import CampaignInfo from './pages/CampaignInfo/CampaignInfo';
import { useStoreActions, useStoreState } from 'easy-peasy';
import SentOffer from './pages/SentOffer/SentOffer'
import ActiveCampaigns from './pages/ActiveCampaigns/ActiveCampaigns';

//import store from "./shared/store/store"

export function Brand({ match }) {
    const channels = useStoreState(state => state.brand.list);
    const listBrands = useStoreActions(actions => actions.brand.listBrands);
    const setActiveBrandId = useStoreActions(actions => actions.brand.setActiveBrandId);
    const activeBrand = useStoreState(state => state.brand.activeBrandId);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    const [sidebarOpened, setSidebarOpened] = useState(false);

    useEffect(() => {
        listBrands();
    }, []);

    function toggleSidebar() {
        setSidebarOpened(!sidebarOpened);
    }

    return (
        <div className="dashboard">
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
                                activeKey="/home">
                                <div className="sidebar-sticky"></div>
                                <Nav.Item>
                                    <Nav.Link as={Link} to={`${match.path}/overview`} className={!sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                        <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                        {sidebarExpanded ? <span>&nbsp;</span> : null}
                                        <span>Dashboard</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={Link} to={`${match.path}/campaigns`} className={!sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                        <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                        {sidebarExpanded ? <span>&nbsp;</span> : null}
                                        <span>Campaing Manager</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={Link} to={`${match.path}/campaigns/active`} className={!sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                        {sidebarExpanded ? <div className="no-icon-space"></div> : null}
                                        {sidebarExpanded ? <span>&nbsp;</span> : null}
                                        <span>Active Campaigns</span>
                                    </Nav.Link>
                                    <Nav.Link as={Link} to={`${match.path}/sent-offer`} className={!sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                        {sidebarExpanded ? <div className="no-icon-space"></div> : null}
                                        {sidebarExpanded ? <span>&nbsp;</span> : null}
                                        <span>Sent Offer</span>
                                    </Nav.Link>
                                    <Nav.Link as={Link} to={`${match.path}/new-campaign`} className={!sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                        {sidebarExpanded ? <div className="no-icon-space"></div> : null}
                                        {sidebarExpanded ? <span>&nbsp;</span> : null}
                                        <span>Add New Campaign</span>
                                    </Nav.Link>

                                    <Nav.Link className={!sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                        {sidebarExpanded ? <div className="no-icon-space"></div> : null}
                                        {sidebarExpanded ? <span>&nbsp;</span> : null}
                                        <span>See Previous Campaings</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={Link} to={`${match.path}/pending-requests`} className={!sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                        {sidebarExpanded ? <div className="no-icon-space"></div> : null}
                                        {sidebarExpanded ? <span>&nbsp;</span> : null}
                                        <span>Pending Requests</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>

                                    <Nav.Link as={Link} to={`${match.path}/brands`} className={!sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>

                                        <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                        {sidebarExpanded ? <span>&nbsp;</span> : null}
                                        <span>Brand Manager</span>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link as={Link} to={`${match.path}/add`} className={!sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                        {sidebarExpanded ? <div className="no-icon-space"></div> : null}
                                        {sidebarExpanded ? <span>&nbsp;</span> : null}
                                        <span>Add New Brand</span>
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

                                    <Nav.Link as={Link} to={`${match.path}/sent-offer`} className={!sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>

                                        <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />

                                        {sidebarExpanded ? <span>&nbsp;</span> : null}

                                        <span>Sent Offer</span>
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
                            <div className="fill-space"></div>

                            {/* <div className="logout-container">
                                    <Nav.Item>
                                        <span>Logout</span>
                                    </Nav.Item>
                                </div> */}

                        </div>
                        <div className="sidebar-content">
                            <nav className="navbar navbar-expand navbar-light shadow-sm py-3 mb-4">
                                <FontAwesomeIcon className="d-lg-none" icon={faBars} onClick={() => toggleSidebar()} />
                                <div className="my-2 my-0 mr-auto">
                                    <ul className="navbar-nav">
                                        <li className="nav-item mr-4">
                                            <Form.Control as="select" value={activeBrand} onChange={(event) => setActiveBrandId(event.target.value)}>
                                                <option disabled value="">Select Brand</option>
                                                {
                                                    channels.map((value, index) =>
                                                        <option key={index} value={value._id}>{value.name}</option>
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
                                    <Route path={`${match.path}/overview`} exact component={Overview} />
                                    <Route path={`${match.path}/campaigns`} exact component={CampaignManager} />
                                    <Route path={`${match.path}/campaigns/active`} exact component={ActiveCampaigns} />
                                    <Route path={`${match.path}/pending-requests`} exact component={PendingRequests} />
                                    <Route path={`${match.path}/brands`} exact component={BrandManager} />
                                    <Route path={`${match.path}/add/`} exact component={AddBrand} />
                                    <Route path={`${match.path}/edit/:id`} exact component={AddBrand} />
                                    <Route path={`${match.path}/new-campaign`} exact component={NewCampaign} />
                                    <Route path={`${match.path}/calender`} exact component={Calender} />
                                    <Route path={`${match.path}/payment`} exact component={Payment} />
                                    <Route path={`${match.path}/help`} exact component={Help} />
                                    <Route path={`${match.path}/campaigns/:id`} exact={true} component={CampaignInfo} />
                                    <Route path={`${match.path}/campaigns/:id/campaign-invite`} exact={true} component={CampaignInvite} />
                                    <Route path={`${match.path}/sent-offer`} exact={true} component={SentOffer} />


                                </Switch>
                            </div>
                        </div>
                    </Router>
                </div>
            </div >
        </div >

    )
}