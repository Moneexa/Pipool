import React from 'react'

import './Dashboardindex.css'

function DashBoardIndex() {
    return (
        <div className="home">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h2 className="m-0 font-weight-bold">Dashboard datas</h2>
            </div>
            <div className="d-flex flex-wrap align-items-stretch">
                <div className="col-12 col-md-6 mb-4">
                    <div className="card border-yellow border-5 rounded-20 no-shadow h-100">
                        <div className="card-body">
                            <div className="chart-area">
                                <h2 className="m-0 font-weight-bold">Campaign (annual)</h2>

                                <p style={{ fontWeight: "bold" }}>Your feedbacks over this year </p>
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
            </div>
            <div className="d-flex flex-wrap align-items-stretch">
                <div className="col-12 col-md-6 mb-4">

                    <div className="card border-yellow border-5 rounded-20 no-shadow h-100">

                        <div className="card-body">

                            <div className="chart-area">
                                <h2 className="m-0 font-weight-bold">Tasks</h2>

                                <p style={{ fontWeight: "bold" }}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                                <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.</p><br></br>
                                <div id="btn-top" className="mt-4 text-center small">
                                    <button className="d-sm-inline-block btn text-white rounded-30 px-5 btn-primary shadow-sm">See more</button>
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
        </div>
    )
}

export default DashBoardIndex;