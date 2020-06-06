import React from 'react'
import { Link } from 'react-router-dom'
import './Overview.css'

function Overview() {
    return (
        <div className="home-influence">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h2 className="m-0 font-weight-bold">Dashboard datas</h2>
            </div>
            <div className="d-flex flex-wrap align-items-stretch">
                <div className="col-12 col-md-6 mb-4">
                    <div className="card border-yellow border-5 rounded-20 no-shadow h-100">
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
                <div className="col-12 col-md-6 mb-4">

                    <div className="card border-yellow border-5 rounded-20 no-shadow h-100">

                        <div className="card-body">

                            <div className="chart-area">
                                <h2 className="m-0 font-weight-bold">Earning (monthly)</h2>

                                <p style={{ fontWeight: "bold" }}>Your earning over this month </p>
                                <div class="card-body">
                                    <h4 class="small font-weight-bold text-grey">Server Migration <span class="float-right">20%</span></h4>
                                    <div class="progress mb-4">
                                        <div class="progress-bar bg-danger" role="progressbar" style={{ "width": "20%" }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <h4 class="small font-weight-bold text-grey">Sales Tracking <span class="float-right">40%</span></h4>
                                    <div class="progress mb-4">
                                        <div class="progress-bar bg-warning" role="progressbar" style={{ "width": "40%" }} aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <h4 class="small font-weight-bold text-grey">Customer Database <span class="float-right">60%</span></h4>
                                    <div class="progress mb-4">
                                        <div class="progress-bar dark-blue" role="progressbar" style={{ "width": "60%" }} aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <h4 class="small font-weight-bold text-grey">Payout Details <span class="float-right">80%</span></h4>
                                    <div class="progress mb-4">
                                        <div class="progress-bar bg-info" role="progressbar" style={{ "width": "80%" }} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <h4 class="small font-weight-bold text-grey">Account Setup <span class="float-right">Complete!</span></h4>
                                    <div class="progress">
                                        <div class="progress-bar bg-success" role="progressbar" style={{ "width": "100%" }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>


                            </div>

                        </div>

                    </div>

                </div>
            </div>
            <div className="d-flex flex-wrap align-items-stretch">

                <div className="col-12 col-md-6 mb-4">
                    <div className="card border-yellow border-5 rounded-20 no-shadow h-100">
                        <div className="card-body">

                            <div className="chart-area">
                                <h2 className="m-0 font-weight-bold">Campaign (month)</h2>

                                <p style={{ fontWeight: "bold" }}>Your feedbacks over this month </p>
                                <div className="chart-pie pt-4 pb-2">
                                    <canvas id="myPieChart"></canvas>
                                </div>
                                <div id="btn-top" className="mt-4 text-center small row px-3" style={{ marginTop: "0 !important" }}>
                                    <div className="col-4 px-1">
                                        <button className="btn btn-sm shadow-sm mx-1 py-1 w-100 green">Referral 30</button>
                                    </div>
                                    <div className="col-4 px-1">
                                        <button className="btn btn-sm shadow-sm mx-1 py-1 w-100 blue">Social 15</button>
                                    </div>
                                    <div className="col-4 px-1">
                                        <button className="btn btn-sm shadow-sm mx-1 py-1 w-100 dark-blue">Direct 55</button>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </div>
                <div className="col-12 col-md-6 mb-4">

                    <div className="card border-yellow border-5 rounded-20 no-shadow h-100">

                        <div className="card-body">

                            <div className="chart-pie mb-3" style={{ padding: "0 !important" }}>
                                <h2 className="m-0 font-weight-bold">Pending Requests</h2>
                            </div>
                            <div className="pb-2 mb-3" style={{ padding: "0 !important" }}>

                                <p className="text-secondary">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>
                                <button className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm btn-primary shadow-sm mr-3">Accept</button>
                                <button className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm shadow-sm grey">Deny</button>

                            </div>
                            <div className="pb-2 mb-3" style={{ padding: "0 !important" }}>

                                <p className="text-secondary">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>
                                <button className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm btn-primary shadow-sm mr-3">Accept</button>
                                <button className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm shadow-sm grey">Deny</button>

                            </div>
                            <div id="btn-top" className="mt-4 text-center small">
                                <button className="d-none d-sm-inline-block btn text-white rounded-30 px-5 btn-primary shadow-sm">See more</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-wrap align-items-stretch">
                <div className="col-12 col-md-6 mb-4">

                    <div className="card border-yellow border-5 rounded-20 no-shadow h-100">

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

export default Overview;