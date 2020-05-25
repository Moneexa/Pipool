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
import { makeStyles } from '@material-ui/core/styles';
import { StylesContext } from '@material-ui/styles';

//import store from "./shared/store/store"
const useStyles = makeStyles({
    topbar: {
        height: '4.375 rem'
      },
      sidebar: {
        minWidth: "14rem !important",
        background: "#ffc809",
        height: "100vh",
        overflowY: "auto",
        fontSize: "0.85rem",
      },
      sidebarContent :{
        flex: "1",
        height: "100vh",
        overflowY: "auto"
      },
      
      topbarDivider :{
        width: "100%",
        borderRight: "0 !important",
        height: "auto !important",
        margin: "auto 1rem",
        textAlign: "right"
      },
      a: {
        padding: "20px",
        fontWeight: "bold",
        color:"#ffc809"
      },
      
      noIconSpace: {
        width: "1.125em",
        height: "1rem",
        display: "inline-block",
      },
         sidebarToggle: {
        width: "2.5rem",
        height: "2.5rem",
        textAlign: "center",
        marginBottom: "1rem",
        cursor: "pointer",
        backgroundColor: "rgba(255,255,255,.2)",
    
    }
})


    function Layout() {
        const classes = useStyles();

        return (
    
            <div className="layout">

                <div id="wrapper">
                    <div className="d-flex">
                        <Router>
                            <div className={classes.sidebar}>
                                <a className="sidebar-brand d-flex align-items-center justify-content-center" style={{ marginTop: "20px", marginBottom: "30px" }}>
                                    <img src="/img/logo.jpg" />
                                    <div className="sidebar-brand-icon rotate-n-15">
                                    </div>
                                </a>
                                <Nav className="d-none d-md-block bg-yello"
                                    activeKey="/home">
                                    <div className="sidebar-sticky"></div>
                                    <Nav.Item>
                                        <Nav.Link href="/home">
                                            <FontAwesomeIcon icon={faTachometerAlt} style={{ color: "white" }} />
                                            &nbsp;
                                            <span>Dashboard</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/campaigns">
                                            <div className={classes.noIconSpace}></div>
                                            &nbsp;
                                            <span>Campaigns</span>
                                        </Nav.Link>
                                        <Nav.Link href="/pending-requests">
                                            <div className={classes.noIconSpace}></div>
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
                                        <Nav.Link href="/brands">
                                            <div className={classes.noIconSpace}></div>
                                            &nbsp;
                                            <span>Brand</span>
                                        </Nav.Link>
                                        <Nav.Link href="/add-brand">
                                            <div className={classes.noIconSpace}></div>
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
                                        <Nav.Link href="/new-campaign">
                                            <div className={classes.noIconSpace}></div>
                                            &nbsp;
                                            <span>Add New Campaign</span>
                                        </Nav.Link>

                                        <Nav.Link href="#">
                                            <div className={classes.noIconSpace}></div>
                                            &nbsp;
                                            <span>See Previous Campaings</span>
                                        </Nav.Link>
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
                                    <div className="d-flex align-items-center justify-content-center">
                                        <button className={classes.sidebarToggle}></button>
                                    </div>
                                </Nav>
                            </div>
                            <div className={classes.sidebarContent}>
                                <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                                    <div className={classes.topbar}>
                                        <div className="d-flex flex-direction-row justify-content-flex-end align-items-center">
                                            <a className={classes.a} href="http://rameshbhardwaj.com/piermatteo/dashboard/">HOME</a>
                                            <a className={classes.a} href="http://rameshbhardwaj.com/piermatteo/dashboard/profile/">PROFILE</a></div>
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


export default Layout;