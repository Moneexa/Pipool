import { faChevronLeft, faChevronRight, faTachometerAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Nav } from "react-bootstrap";
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

//import store from "./shared/store/store"

export class Brand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarExpanded: true,
            sidebarOpened: false
        }
    }
    toggleSidebar() {
        this.setState({ sidebarOpened: !this.state.sidebarOpened })
    }
    render = () => {
        return (
            <div className="dashboard">
                {
                    this.state.sidebarOpened ? <div className="sidebar-overlay" onClick={() => this.toggleSidebar()}></div> : null
                }
                <div id="wrapper">
                    <div className="d-flex">
                        <Router>
                            <div className={"sidebar " + (this.state.sidebarExpanded ? "" : "collapsed") + " " + (this.state.sidebarOpened ? "opened" : "")}>
                                <Link to={this.props.match.path} className="sidebar-brand d-flex align-items-center justify-content-center" style={{ marginTop: "20px", marginBottom: "30px" }}>
                                    <img alt="" src="../img/logo.jpg" />
                                    <div className="sidebar-brand-icon rotate-n-15">
                                    </div>
                                </Link>

                                <Nav className="d-md-block bg-yello"
                                    activeKey="/home">
                                    <div className="sidebar-sticky"></div>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to={`${this.props.match.path}/overview`} className={!this.state.sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            {this.state.sidebarExpanded ? <span>&nbsp;</span> : null}
                                            <span>Dashboard</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        {/* <Nav.Link disabled className={!this.state.sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            {this.state.sidebarExpanded ? <span>&nbsp;</span> : null}
                                            <span>Campaing Manager</span>
                                        </Nav.Link> */}
                                        <Nav.Link as={Link} to={`${this.props.match.path}/campaigns`} className={!this.state.sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            {this.state.sidebarExpanded ? <span>&nbsp;</span> : null}
                                            <span>Campaing Manager</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to={`${this.props.match.path}/new-campaign`} className={!this.state.sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                            {this.state.sidebarExpanded ? <div className="no-icon-space"></div> : null}
                                            {this.state.sidebarExpanded ? <span>&nbsp;</span> : null}
                                            <span>Add New Campaign</span>
                                        </Nav.Link>

                                        <Nav.Link className={!this.state.sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                            {this.state.sidebarExpanded ? <div className="no-icon-space"></div> : null}
                                            {this.state.sidebarExpanded ? <span>&nbsp;</span> : null}
                                            <span>See Previous Campaings</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to={`${this.props.match.path}/pending-requests`} className={!this.state.sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                            {this.state.sidebarExpanded ? <div className="no-icon-space"></div> : null}
                                            {this.state.sidebarExpanded ? <span>&nbsp;</span> : null}
                                            <span>Pending Requests</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        <Nav.Link as={Link} to={`${this.props.match.path}/brands`} className={!this.state.sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>

                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            {this.state.sidebarExpanded ? <span>&nbsp;</span> : null}
                                            <span>Brand Manager</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to={`${this.props.match.path}/add`} className={!this.state.sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                            {this.state.sidebarExpanded ? <div className="no-icon-space"></div> : null}
                                            {this.state.sidebarExpanded ? <span>&nbsp;</span> : null}
                                            <span>Add New Brand</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        <Nav.Link as={Link} to={`${this.props.match.path}/calender`} className={!this.state.sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>

                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />

                                            {this.state.sidebarExpanded ? <span>&nbsp;</span> : null}

                                            <span>Calender</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        <Nav.Link as={Link} to={`${this.props.match.path}/payment`} className={!this.state.sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            {this.state.sidebarExpanded ? <span>&nbsp;</span> : null}
                                            <span>Settings and Payments</span> </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        <Nav.Link as={Link} to={`${this.props.match.path}/help`} className={!this.state.sidebarExpanded ? 'd-flex flex-column align-items-center' : ''}>
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            {this.state.sidebarExpanded ? <span>&nbsp;</span> : null}
                                            <span>Help and FAQ</span> </Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                <div className="collapse-button-container d-flex justify-content-center">
                                    <div
                                        onClick={() => {
                                            if (this.state.sidebarOpened) {
                                                this.setState({ sidebarOpened: !this.state.sidebarOpened })
                                            }

                                            else {
                                                this.setState({ sidebarExpanded: !this.state.sidebarExpanded })
                                            }

                                        }

                                        }
                                        className="collapse-button d-flex justify-content-center align-items-center rounded-circle"
                                    >

                                        <FontAwesomeIcon icon={this.state.sidebarExpanded ? faChevronLeft : faChevronRight} />
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
                                    <FontAwesomeIcon className="d-lg-none" icon={faBars} onClick={() => this.toggleSidebar()} />
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
                                        <Redirect from={`${this.props.match.path}/`} exact to={`${this.props.match.path}/overview`} />
                                        <Route path={`${this.props.match.path}/overview`} exact component={Overview} />
                                        <Route path={`${this.props.match.path}/campaigns`} exact component={CampaignManager} />
                                        <Route path={`${this.props.match.path}/pending-requests`} exact component={PendingRequests} />
                                        <Route path={`${this.props.match.path}/brands`} exact component={BrandManager} />
                                        <Route path={`${this.props.match.path}/add/`} exact component={AddBrand} />
                                        <Route path={`${this.props.match.path}/edit/:id`} exact component={AddBrand} />
                                        <Route path={`${this.props.match.path}/new-campaign`} exact component={NewCampaign} />
                                        <Route path={`${this.props.match.path}/calender`} exact component={Calender} />
                                        <Route path={`${this.props.match.path}/payment`} exact component={Payment} />
                                        <Route path={`${this.props.match.path}/help`} exact component={Help} />
                                        <Route path={`${this.props.match.path}/campaigns/:id`} exact={true} component={CampaignInfo} />
                                        <Route path={`${this.props.match.path}/campaigns/:id/campaign-invite`} exact={true} component={CampaignInvite} />

                                    </Switch>
                                </div>
                            </div>
                        </Router>
                    </div>
                </div >
            </div >

        )
    }
}