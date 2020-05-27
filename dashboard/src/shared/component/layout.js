import React from 'react';
//import logo from './logo.svg';
//import './App.css';
//import CommitteeList from './shared/CommitteeList'
//import { CommitteeAttendance } from './shared/CommitteeAttendance'
import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, NavLink } from "react-bootstrap";
import DashboardIndex from '../../pages/dashboard/DashBoardIndex'
import Campaigns from '../../pages/dashboard/Campaigns'
import PendingRequests from '../../pages/dashboard/PendingRequests';
import Brands from '../../pages/BrandManager/Brand'
import AddBrand from '../../pages/BrandManager/AddBrand'
import NewCampaign from '../../pages/CampaignManager/NewCampaign'
import Calender from '../../pages/Calender/Calender'
import Payment from '../../pages/Payment/Payment'
import Help from '../../pages/Help/Help'
import { Provider } from "react-redux";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTachometerAlt, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import './layout.css';

//import store from "./shared/store/store"

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpened: true
        }
    }
    render = () => {
        return (
            <div className="layout">
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
                                    activeKey="/home">
                                    <div className="sidebar-sticky"></div>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to="/home" className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Dashboard</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to="/campaigns" className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            {this.state.sidebarOpened ? <div className="no-icon-space"></div> : null}
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Campaigns</span>
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/pending-requests" className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
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
                                        <Nav.Link as={Link} to="/brands" className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            {this.state.sidebarOpened ? <div className="no-icon-space"></div> : null}
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Brand</span>
                                        </Nav.Link>

                                        <Nav.Link as={Link} to="/add-brand" className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
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
                                        <Nav.Link as={Link} to="/new-campaign" className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
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

                                        <Nav.Link as={Link} to="/calender" className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>

                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />

                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}

                                            <span>Calender</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        <Nav.Link as={Link} to="/payment" className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            {this.state.sidebarOpened ? <span>&nbsp;</span> : null}
                                            <span>Settings and Payments</span> </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        <Nav.Link as={Link} to="/help" className={!this.state.sidebarOpened ? 'd-flex flex-column align-items-center' : ''}>
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
                                        <Route exact path="/home" component={DashboardIndex}>
                                            <DashboardIndex />
                                        </Route>
                                        <Route path="/campaigns" component={Campaigns}>
                                            <Campaigns />
                                        </Route>
                                        <Route path="/pending-requests" component={PendingRequests}>
                                            <PendingRequests />
                                        </Route>
                                        <Route path="/brands" component={Brands}>
                                            <Brands />
                                        </Route>
                                        <Route path="/add-brand" component={AddBrand}>
                                            <AddBrand />
                                        </Route>
                                        <Route path="/new-campaign" component={NewCampaign}>
                                            <NewCampaign />
                                        </Route>
                                        <Route path="/calender" component={Calender}>
                                            <Calender />
                                        </Route>
                                        <Route path="/payment" component={Payment}>
                                            <Payment />
                                        </Route>
                                        <Route path="/help" component={Help}>
                                            <Help />
                                        </Route>
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

export default Layout;