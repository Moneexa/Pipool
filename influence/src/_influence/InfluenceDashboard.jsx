import React from 'react';
import { Switch, BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, NavLink } from "react-bootstrap";
import DashboardInfluenceIndex from './pages/dashboard/DashBoardInfluenceIndex'
import CampaignInfluence from './pages/dashboard/CampaignInfluence'
import PendingRequestsInfluence from './pages/dashboard/PendingRequestsInfluence';
import Channel from './pages/ChannelManager/Channel'
import AddChannel from './pages/ChannelManager/AddChannel'
import newCampaignIfluence from './pages/CampaignManager/newCampaignInfluence'
import PastCampaignFeedback from './pages/CampaignManager/PastCampaignFeedback'
import calenderInfluence from './pages/Calender/calenderInfluence'
import PaymentInfluence from './pages/Payment/PaymentInfluence'
import HelpInfluence from './pages/Help/HelpInfluence'
import { Provider } from "react-redux";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import './influenceDashboard.css';

//import store from "./shared/store/store"

export class influenceDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpened: true
        }
    }
    render = () => {
        return (
            <div className="dashboard-influence">
                <div id="wrapper">
                    <div className="d-flex">
                        <Router>
                            <div className={"sidebar " + (this.state.sidebarOpened ? "" : "collapsed")}>
                                <a className="sidebar-brand d-flex align-items-center justify-content-center" style={{ marginTop: "20px", marginBottom: "30px" }}>
                                    <img src="../img/logo.jpg" />
                                    <div className="sidebar-brand-icon rotate-n-15">
                                    </div>
                                </a>

                                <Nav className="d-md-block bg-yello"
                                    activeKey="/influence-home">
                                    <div className="sidebar-sticky"></div>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to={`${this.props.match.path}/influence-home`} className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Dashboard</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to={`${this.props.match.path}/campaigns-influence`} className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            {this.state.sidebarOpened ? <div className="no-icon-space"></div> : null}
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Campaigns</span>
                                        </Nav.Link>
                                        <Nav.Link as={Link} to={`${this.props.match.path}/pending-requests-influence`} className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            {this.state.sidebarOpened ? <div className="no-icon-space"></div> : null}
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Pending Requests</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        <Nav.Link disabled className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>

                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Channel Manager</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to={`${this.props.match.path}/channels`} className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            {this.state.sidebarOpened ? <div className="no-icon-space"></div> : null}
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Channels</span>
                                        </Nav.Link>

                                        <Nav.Link as={Link} to={`${this.props.match.path}/add-channels`} className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            {this.state.sidebarOpened ? <div className="no-icon-space"></div> : null}
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Add New Channel</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        <Nav.Link as={Link} to= {`${this.props.match.path}/campaign-feedbacks`} className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Past Campaign Feebdbacks</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to={`${this.props.match.path}/new-campaign-influencer`} className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            {this.state.sidebarOpened ? <div className="no-icon-space"></div> : null}
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Add New Campaign</span>
                                        </Nav.Link>

                                        <Nav.Link className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            {this.state.sidebarOpened ? <div className="no-icon-space"></div> : null}
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>See Previous Campaings</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        <Nav.Link as={Link} to={`${this.props.match.path}/calender-influence`} className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>

                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />

                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}

                                            <span>Calender</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        <Nav.Link as={Link} to={`${this.props.match.path}/payment-influence`} className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Settings and Payments</span> </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        <Nav.Link as={Link} to={`${this.props.match.path}/help-influence`} className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Help and FAQ</span> </Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                <div className="collapse-button-container d-flex justify-content-center">
                                    <div
                                        onClick={() => this.setState({ sidebarOpened: !this.state.sidebarOpened })}
                                        className="collapse-button d-flex justify-content-center align-items-center rounded-circle"
                                    >

                                        <FontAwesomeIcon icon={this.state.sidebarOpened ? faChevronLeft : faChevronRight} />
                                    </div>
                                </div>

                            </div>
                            <div className="sidebar-content">
                                <nav className="navbar navbar-expand-lg navbar-light shadow-sm py-3 mb-4">

                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <form className="form-inline my-2 my-lg-0 ml-auto">
                                            <ul className="navbar-nav mr-sm-2">
                                                <li className="nav-item mr-4">
                                                    <Link className="nav-link font-weight-bold text-primary text-uppercase" to="/influence-home">Home</Link>
                                                </li>
                                                <li className="nav-item mr-4">
                                                    <Link className="nav-link font-weight-bold text-primary text-uppercase" to="/influence-home">Profile</Link>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </nav>
                                <div className="container-fluid">
                                    <Route path={`${this.props.match.path}/influence-home`} component={DashboardInfluenceIndex} />
                                    <Route path={`${this.props.match.path}/campaigns-influence`} component={CampaignInfluence} />
                                    <Route path={`${this.props.match.path}/pending-requests-influence`} component={PendingRequestsInfluence} />
                                    <Route path={`${this.props.match.path}/channels`} component={Channel} />
                                    <Route path={`${this.props.match.path}/add-channels`} component={AddChannel} />
                                    <Route path={`${this.props.match.path}/campaign-feedbacks`} component={PastCampaignFeedback} />
                                    <Route path={`${this.props.match.path}/new-campaign-influencer`} component={newCampaignIfluence} />
                                    <Route path={`${this.props.match.path}/calender-influence`} component={calenderInfluence} />
                                    <Route path={`${this.props.match.path}/payment-influence`} component={PaymentInfluence} />
                                    <Route path={`${this.props.match.path}/help-influence`} component={HelpInfluence} />

                                </div>
                            </div>
                        </Router>
                    </div>
                </div >
            </div >

        )
    }
}