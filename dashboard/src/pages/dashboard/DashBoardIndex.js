import React from 'react'

import './Dashboardindex.css'

import { useStyles } from 'react-styles-hook'

const styles = useStyles({
    green: {
        background: "#1cc88a !important",
        borderRadius: "5px",
        fontSize: "14px",
    },
    blue: {
        background: "#36b9cc",
        borderRadius: "5px",
        fontSize: "14px",
    },
    darkblue: {

        background: "#4e73df",
        borderRadius: "5px",
        fontSize: "14px",
    },
    cardShadow: {
        border: "5px solid #fce391",
        borderRadius: "20px",
        minHeight: "460px"
    },
    denny: {
        background: "#e5e5e5",
        width: "20 %",
        fontSize: "14px"
    },
    cardHeader: {
        background: "#fff",
    },
    contentWrapper: {
        background: "#fff!important",
    },
    anotherCardShadow: {
        boxShadow: "none!important",
    },
    bgGradientPrimary: {
        backgroundColor: "#ffc809!important",
        backgroundImage: "none",
    },
    smButtonPrimaryShadow: {
        width: "30%",
        fontSize: "20px",
        borderRadius: "30px",
    },
    fontWeightBolText: {
        color: "#000!important",
        marginBottom: "20px!important",
    },
    navItemAnchor: {
        color: "#fff!important"
    },
    tachometerAlt: {
        color: "#fff!important",
    },
    btnPrimary: {
        background: "#ffc809",
        border: "none",
    },
    accept: {
        width: "20 %",
        fontSize: "14px",
    }


})


function DashBoardIndex() {
    const _styles = styles
    return (

        <div className="home">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h2 style={_styles.fontWeightBolText} className="m-0 font-weight-bold">Dashboard datas</h2>
            </div>
            <div className="row">
                <div id="border" className="col-xl-6 col-lg-7">

                    <div style={_styles.cardShadow} className="card shadow mb-4">

                        <div className="card-body">

                            <div className="chart-area">
                                <h2 style={_styles.fontWeightBolText} className="m-0 font-weight-bold">Campaign (annual)</h2>

                                <p style={{ fontWeight: "bold" }}>Your feedbacks over this year </p>
                                <div className="chart-area">
                                    <canvas id="myAreaChart"></canvas>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div id="border" className="col-xl-6 col-lg-7">

                    <div style={_styles.cardShadow} className="card shadow mb-4">

                        <div className="card-body">

                            <div className="chart-area">
                                <h2 style={_styles.fontWeightBolText} className="m-0 font-weight-bold">Campaign (month)</h2>

                                <p style={{ fontWeight: "bold" }}>Your feedbacks over this month </p>
                                <div className="chart-pie pt-4 pb-2">
                                    <canvas id="myPieChart"></canvas>
                                </div>
                                <div id="btn-top" className="mt-4 text-center small" style={{ marginTop: "0 !important" }}>
                                    <a href="#" style={_styles.green} id="green" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Referral 30</a>
                                    <a href="#" style={_styles.blue} id="blue" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Social 15</a>
                                    <a href="#" style={_styles.darkblue} id="darkblue" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Direct 55</a>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            </div>
            <div className="row">
                <div id="border" className="col-xl-6 col-lg-7">

                    <div style={_styles.cardShadow} className="card shadow mb-4">

                        <div className="card-body">

                            <div className="chart-area">
                                <h2 style={_styles.fontWeightBolText} className="m-0 font-weight-bold">Tasks</h2>

                                <p style={{ fontWeight: "bold" }}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                                <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.</p><br></br>
                                <div id="btn-top" className="mt-4 text-center small">

                                    <a style={_styles.btnPrimary} href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">See more</a>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div id="border" className="col-xl-6 col-lg-5">

                    <div style={_styles.cardShadow} className="card shadow mb-4">

                        <div className="card-body">

                            <div className="chart-pie pt-4 pb-2" style={{ padding: "0 !important" }}>
                                <h2 style={_styles.fontWeightBolText} className="m-0 font-weight-bold">Pending Requests</h2>

                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoardIndex;