import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    chartjsRenderMonitor: {
        animation: "chartjs - render - animation 1ms"
    },
    green: {
        background: "#1cc88a!important",
        borderRadius: "5px",
        fontSize: "14px",

    },
    blue: {
        background: "#36b9cc",
        borderRadius: "5px",
        fontSize: "14px"
    },
    darkblue: {

        background: "#4e73df",
        borderRadius: "5px",
        fontSize: "14px"
    },
    borderCard: {
        border: "5px solid #fce391",
        borderRadius: "20px",
        minHeight: "460px",
        background: "#fff"

    },
    denny: {
        background: "#e5e5e5",
        width: "20 %",
        fontSize: "14px",
        borderRadius: "30px"
    },

    contentWrapper: {
        background: "#fff!important",
    },
    cardShadow: {
        boxShadow: "none!important",
        marginBottom: "4px",
        border: "5px solid #fce391",
        borderRadius: "20px",
        minHeight: "460px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        minWidth: "0",
        wordWrap: "break-word",
        backgroundColor: "#fff",
        backgroundClip: "border-box"
    },
    bgGradientPrimary: {
        backgroundColor: "#ffc809!important",
        backgroundImage: "none"
    },
    primaryShadowButton: {
        width: "30 %",
        fontSize: "20px",
        borderRadius: "30px"
    },
    weightBoldtext: {
        color: "#000!important",
        marginBottom: "20px!important",
        margin: "0px",
    },
    navItema: {
        color: "#fff!important"
    },
    tachoMeterAlt: {
        color: "#fff!important"
    },
    btnPrimary: {
        background: "#ffc809",
        border: "none"
    },
    accept: {
        width: "20 %",
        width: "30 %",
        fontSize: "20px",
        borderRadius: "30px"
    }





})
function DashBoardIndex() {
    const classes = useStyles();
    return (

        <div className="home">

            <div className="d-sm-flex align-items-center justify-content-between mb-4">

                <h2 className={classes.weightBoldtext}>Dashboard datas</h2>

            </div>

            <div className="row">

                <div id="border" className="col-xl-6 col-lg-7">

                    <div className={classes.cardShadow}>

                        <div className="card-body">

                            <div className="chart-area">
                                <h2 className={classes.weightBoldtext}>Campaign (annual)</h2>
                                <p style={{ fontWeight: "bold" }}>Your feedbacks over this year </p>
                                <div className="chart-area">
                                    <canvas id="myAreaChart"></canvas>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div id="border" className="col-xl-6 col-lg-7">

                    <div className={classes.cardShadow}>

                        <div className="card-body">

                            <div className="chart-area">
                                <h2 className={classes.weightBoldtext}>Campaign (month)</h2>

                                <p style={{ fontWeight: "bold" }}>Your feedbacks over this month </p>
                                <div className="chart-pie pt-4 pb-2">
                                    <canvas id="myPieChart" width="892" height="490" className="chartjs-render-monitor" style={{ display: "block", height: "245px", width: "446px" }}></canvas>
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
                    <div className={classes.cardShadow}>

                        <div className="card-body">

                            <div className="chart-area">
                                <h2 className={classes.weightBoldtext}>Tasks</h2>

                                <p style={{ fontWeight: "bold" }}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                                <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.</p><br></br>
                                <div id="btn-top" className="mt-4 text-center small">

                                    <a href="#" className={classes.primaryShadowButton}>See more</a>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div id="border" className="col-xl-6 col-lg-5">

                    <div className={classes.cardShadow}>

                        <div className="card-body">

                            <div className="chart-pie pt-4 pb-2" style={{ padding: "0 !important" }}>
                                <h2 className={classes.weightBoldtext}>Pending Requests</h2>

                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>

                                <a href="#" id="accept" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Accept</a>
                                <a href="#" id="denny" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Deny</a>
                                <br /><br />
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>

                                <a href="#" id="accept" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Accept</a>
                                <a href="#" id="denny" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Deny</a>

                            </div><br /><br />

                            <div id="btn-top" className="mt-4 text-center small">

                                <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">See more</a>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )

}

export default DashBoardIndex;