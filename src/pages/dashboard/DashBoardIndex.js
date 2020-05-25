import React from 'react'
//import './DashBoardIndex.css'
import {} from 'react'
class DashBoardIndex extends React.Component {
    render = () => {

        return (

            <div className="home">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h2 className="m-0 font-weight-bold text-primary">Dashboard datas</h2>
                </div>
                <div className="row">
                    <div id="border" className="col-xl-6 col-lg-7">

                        <div className="card shadow mb-4">

                            <div className="card-body">

                                <div className="chart-area">
                                    <h2 className="m-0 font-weight-bold text-primary">Campaign (annual)</h2>

                                    <p style={{ fontWeight: "bold" }}>Your feedbacks over this year </p>
                                    <div className="chart-area">
                                        <canvas id="myAreaChart"></canvas>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div id="border" className="col-xl-6 col-lg-7">

                        <div className="card shadow mb-4">

                            <div className="card-body">

                                <div className="chart-area">
                                    <h2 className="m-0 font-weight-bold text-primary">Campaign (month)</h2>

                                    <p style={{ fontWeight: "bold" }}>Your feedbacks over this month </p>
                                    <div className="chart-pie pt-4 pb-2">
                                        <canvas id="myPieChart"></canvas>
                                    </div>
                                    <div id="btn-top" className="mt-4 text-center small" style={{ marginTop: "0 !important" }}>
                                        <a href="#" id="green" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Referral 30</a>
                                        <a href="#" id="blue" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Social 15</a>
                                        <a href="#" id="darkblue" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Direct 55</a>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </div>
                <div className="row">
                    <div id="border" className="col-xl-6 col-lg-7">

                        <div className="card shadow mb-4">

                            <div className="card-body">

                                <div className="chart-area">
                                    <h2 className="m-0 font-weight-bold text-primary">Tasks</h2>

                                    <p style={{ fontWeight: "bold" }}>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                                    <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.</p><br></br>
                                    <div id="btn-top" className="mt-4 text-center small">

                                        <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">See more</a>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div id="border" className="col-xl-6 col-lg-5">

                        <div className="card shadow mb-4">

                            <div className="card-body">

                                <div className="chart-pie pt-4 pb-2" style={{ padding: "0 !important" }}>
                                    <h2 className="m-0 font-weight-bold text-primary">Pending Requests</h2>

                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default DashBoardIndex;