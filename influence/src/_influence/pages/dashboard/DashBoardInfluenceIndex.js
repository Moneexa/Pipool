import React from 'react'
import { Link } from 'react-router-dom'
import './CampaignsInfluence.css'

function DashBoardInfluenceIndex() {
    return (
        <div className="home-influence">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h2 className="m-0 font-weight-bold">Dashboard datas</h2>
            </div>
            <div className="row">
                <div className="col-xl-6 col-lg-7">

                    <div className="card border-yellow border-5 rounded-20 shadow mb-4">

                        <div className="card-body">

                            <div className="chart-area">
                                <h2 className="m-0 font-weight-bold">Earning (annual)</h2>

                                <p style={{ fontWeight: "bold" }}>Your earning over this year </p>
                                <div className="chart-area">
                                    <canvas id="myAreaChart"></canvas>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                <div className="col-xl-6 col-lg-7">

                    <div className="card border-yellow border-5 rounded-20 shadow mb-4">

                        <div className="card-body">

                            <div className="chart-area">
                                <h2 className="m-0 font-weight-bold">Earning (monthly)</h2>

                                <p style={{ fontWeight: "bold" }}>Your earning over this month </p>
                                <div className="chart-area">
                                    <canvas id="myAreaChart"></canvas>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
            <div className="row">

                <div className="col-xl-6 col-lg-7">

                    <div className="card border-yellow border-5 rounded-20 shadow mb-4">

                        <div className="card-body">

                            <div className="chart-area">
                                <h2 className="m-0 font-weight-bold">Campaigns (Types)</h2>

                                <div className="chart-pie pt-4 pb-2">
                                    <canvas id="myPieChart"></canvas>
                                </div>
                                <div id="btn-top" className="mt-4 text-center small" style={{ marginTop: "0 !important" }}>
                                    <a href="#" className="d-none d-sm-inline-block btn btn-sm shadow-sm mx-1 py-1 px-4 green">Referral 30</a>
                                    <a href="#" className="d-none d-sm-inline-block btn btn-sm shadow-sm mx-1 py-1 px-4 blue">Social 15</a>
                                    <a href="#" className="d-none d-sm-inline-block btn btn-sm shadow-sm mx-1 py-1 px-4 dark-blue">Direct 55</a>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                <div className="col-xl-6 col-lg-5">

                    <div className="card border-yellow border-5 rounded-20 shadow mb-4">

                        <div className="card-body">

                            <div className="chart-pie pt-4 pb-2" style={{ padding: "0 !important" }}>
                                <h2 className="m-0 font-weight-bold">Pending Requests</h2>

                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>
                                <Link to="#" style={{

                                    background: "#ffc809",
                                    color: "white",
                                    borderRadius: "30px",
                                    width:"20%",
                                    fontSize: "14px",
                                    boxShadow: "0 .125rem .25rem 0 rgba(58,59,69,.2)!important",
                                    border: "none"

                                }}




                                    id="accept" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Accept</Link>
                                <Link to="#"

                                    style={{

                                        background: "#e5e5e5",
                                        width: "20%",
                                        fontSize: "14px",
                                        borderRadius: "30px",
                                        border: "none",color:"white"
                                    }}




                                    id="denny" class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Deny</Link><br />



                            </div>
                            <br></br>

                            <div id="btn-top" className="mt-4 text-center small">

                                <Link to="#"

                                style={{

                                    width:  "30%",
                                    fontSize:  "20px",
                                    borderRadius:  "30px",
                                
                                    background:  "#ffc809",
                                    color:"white",
                                    border:  "none" ,
                                
                                    boxShadow:  "0 .125rem .25rem 0 rgba(58,59,69,.2)!important"



                                }}


                                    class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">See more</Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6 col-lg-7">

                    <div className="card border-yellow border-5 rounded-20 shadow mb-4">

                        <div className="card-body">

                            <div className="chart-area">
                                <h2 className="m-0 font-weight-bold">Feedback</h2>
                                <div className="chart-pie pt-4 pb-2">
                                    <canvas id="myPieChart"></canvas>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div >

    )
}

export default DashBoardInfluenceIndex;