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
import { faTachometerAlt } from '@fortawesome/free-solid-svg-icons'
import './layout.css';

//import store from "./shared/store/store"

class Layout extends React.Component {
    render = () => {
        return (

            <div className="layout">

                <div id="wrapper">
                    <div className="d-flex">
                        <Router>
                            <div className="sidebar">
                                <a className="sidebar-brand d-flex align-items-center justify-content-center" style={{ marginTop: "20px", marginBottom: "30px" }}>
                                    <img src="../img/logo.jpg" />
                                    <div className="sidebar-brand-icon rotate-n-15">
                                    </div>
                                </a>

                                <Nav className="d-none d-md-block bg-yello"
                                    activeKey="/home">
                                    <div className="sidebar-sticky"></div>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to="/home">
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            &nbsp;
                                            <span>Dashboard</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to="/campaigns">
                                            <div className="no-icon-space"></div>
                                            &nbsp;
                                            <span>Campaigns</span>
                                        </Nav.Link>
                                        <Nav.Link as={Link} to="/pending-requests">
                                            <div className="no-icon-space"></div>
                                            &nbsp;
                                            <span>Pending Requests</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        <Nav.Link disabled>

                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                                &nbsp;
                                            <span>Brand Manager</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to="/brands">
                                            <div className="no-icon-space"></div>
                                            &nbsp;
                                            <span>Brand</span>
                                        </Nav.Link>

                                        <Nav.Link as={Link} to="/add-brand">
                                            <div className="no-icon-space"></div>
                                            &nbsp;
                                            <span>Add New Brand</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        <Nav.Link href="#">
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            &nbsp;
                                            <span>Campaings</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link as={Link} to="/new-campaign">
                                            <div className="no-icon-space"></div>
                                            &nbsp;
                                            <span>Add New Campaign</span>
                                        </Nav.Link>

                                        <Nav.Link href="#">
                                            <div className="no-icon-space"></div>
                                            &nbsp;
                                            <span>See Previous Campaings</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        <Nav.Link as={Link} to="/calender">

                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />

                                            &nbsp;

                                            <span>Calender</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        <Nav.Link as={Link} to="/payment">
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            &nbsp;
                                            <span>Settings and Payments</span> </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>

                                        <Nav.Link as={Link} to="/help">
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            &nbsp;
                                            <span>Help and FAQ</span> </Nav.Link>
                                    </Nav.Item>
                                </Nav>

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