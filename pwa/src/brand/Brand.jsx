import { faChevronLeft, faChevronRight, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Nav } from "react-bootstrap";
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from "react-router-dom";
import AddBrand from './pages/BrandManager/AddBrand';
import Brands from './pages/BrandManager/Brand';
import Calender from './pages/Calender/Calender';
import NewCampaign from './pages/CampaignManager/NewCampaign';
import Campaigns from './pages/dashboard/Campaigns';
import DashboardIndex from './pages/dashboard/DashBoardIndex';
import PendingRequests from './pages/dashboard/PendingRequests';
import Help from './pages/Help/Help';
import Payment from './pages/Payment/Payment';
import './_Brand.css';

//import store from "./shared/store/store"

export class Brand extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpened: true
        }
    }
    render = () => {
        return (
            <div className="dashboard">
                <div id="wrapper">
                    <div className="d-flex">
                        <Router>
                            <div className={"sidebar " + (this.state.sidebarOpened ? "" : "collapsed")}>
                                <button className="sidebar-brand d-flex align-items-center justify-content-center" style={{ marginTop: "20px", marginBottom: "30px" }}>
                                    <img alt="" src="../img/logo.jpg" />
                                    <div className="sidebar-brand-icon rotate-n-15">
                                    </div>
                                </button>

                                <Nav className="d-md-block bg-yello"
                                    activeKey="/home">
                                    <div className="sidebar-sticky"></div>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to={`${this.props.match.path}/overview`} className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Dashboard</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to={`${this.props.match.path}/campaigns`} className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            {this.state.sidebarOpened ? <div className="no-icon-space"></div> : null}
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Campaigns</span>
                                        </Nav.Link>
                                        <Nav.Link as={Link} to={`${this.props.match.path}/pending-requests`} className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            {this.state.sidebarOpened ? <div className="no-icon-space"></div> : null}
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Pending Requests</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        <Nav.Link disabled className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>

                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Brand Manager</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to={`${this.props.match.path}/brands`} className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            {this.state.sidebarOpened ? <div className="no-icon-space"></div> : null}
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Brand</span>
                                        </Nav.Link>

                                        <Nav.Link as={Link} to={`${this.props.match.path}/add-brand`} className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            {this.state.sidebarOpened ? <div className="no-icon-space"></div> : null}
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Add New Brand</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        <Nav.Link disabled className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Campaings</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to={`${this.props.match.path}/new-campaign`} className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
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

                                        <Nav.Link as={Link} to={`${this.props.match.path}/calender`} className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>

                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />

                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}

                                            <span>Calender</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        <Nav.Link as={Link} to={`${this.props.match.path}/payment`} className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Settings and Payments</span> </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        <Nav.Link as={Link} to={`${this.props.match.path}/help`} className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
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
                                                    <Link className="nav-link font-weight-bold text-primary text-uppercase" to="/home">Home</Link>
                                                </li>
                                                <li className="nav-item mr-4">
                                                    <Link className="nav-link font-weight-bold text-primary text-uppercase" to="/home">Profile</Link>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </nav>
                                <div className="container-fluid">
                                    <Switch>
                                        <Redirect from={`${this.props.match.path}/`} exact to={`${this.props.match.path}/overview`} />
                                        <Route path={`${this.props.match.path}/overview`} component={DashboardIndex} />
                                        <Route path={`${this.props.match.path}/campaigns`} component={Campaigns} />
                                        <Route path={`${this.props.match.path}/pending-requests`} component={PendingRequests} />
                                        <Route path={`${this.props.match.path}/brands`} component={Brands} />
                                        <Route path={`${this.props.match.path}/add-brand`} component={AddBrand} />
                                        <Route path={`${this.props.match.path}/new-campaign`} component={NewCampaign} />
                                        <Route path={`${this.props.match.path}/calender`} component={Calender} />
                                        <Route path={`${this.props.match.path}/payment`} component={Payment} />
                                        <Route path={`${this.props.match.path}/help`} component={Help} />
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