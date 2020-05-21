import React from 'react';
//import logo from './logo.svg';
//import './App.css';
//import CommitteeList from './shared/CommitteeList'
//import { CommitteeAttendance } from './shared/CommitteeAttendance'
import { Switch, BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
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

                    <Container fluid>


                        <Row>
                            <Router>

                                <div className="col-md-2 col-lg-2 col-xs-2" style={{ background: "#ffc809" }}>
                                    <a className="sidebar-brand d-flex align-items-center justify-content-center" style={{ marginTop: "20px", marginBottom: "30px" }}>
                                        <img src="../img/logo.jpg" />

                                        <div className="sidebar-brand-icon rotate-n-15">


                                        </div>



                                    </a>

                                    <Nav className="d-none d-md-block bg-yello sidebar"
                                        activeKey="/home"

                                    >
                                        <div className="sidebar-sticky"></div>
                                        <Nav.Item>
                                            <Nav.Link href="/home">
                                                <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                                &nbsp;
                                                <span>Dashboard</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link href="/campaigns">Campaigns</Nav.Link>
                                       
                                            <Nav.Link href="/pending-requests">Pending Requests</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>

                                            <Nav.Link disabled>

                                                <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                                 &nbsp;
                                                <span>Brand Manager
                                                   </span>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link href="/brands">Brand</Nav.Link>
                                        
                                            <Nav.Link href="/add-brand">Add New Brand</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>

                                            <Nav.Link href="#">
                                                <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                                &nbsp;
                                                <span>Campaings</span>
                                            </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link href="/new-campaign">Add New Campaign</Nav.Link>
                                     
                                            <Nav.Link href="#">See Previous Campaings</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>

                                            <Nav.Link href="/calender">

                                                <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                               
                                                &nbsp;

                                                <span>Calender</span>  
                                                </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>

                                            <Nav.Link href="/payment">
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                             &nbsp;
                                               <span>Settings and Payments</span> </Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>

                                            <Nav.Link href="/help">
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                               &nbsp;
                                               <span>Help and FAQ</span> </Nav.Link>
                                        </Nav.Item>
                                    </Nav>

                                </div>
                                <div className="col-md-10 col-lg-10 col-xs-10">

                                    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">






                                        <div className="topbar">
                                            <div className="topbar-divider d-none d-sm-block"
                                            ><a href="http://rameshbhardwaj.com/piermatteo/dashboard/">HOME</a>
                                                <a href="http://rameshbhardwaj.com/piermatteo/dashboard/profile/">PROFILE</a></div>
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

                        </Row>



















                    </Container>




                </div >
            </div >

        )
    }
}

export default Layout;