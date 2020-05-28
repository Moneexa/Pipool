import React from 'react'
// import './PendingRequests.css'
import { useStyles } from 'react-styles-hook'
const style = useStyles({
    accept: {
        background: "#ffc809",
        borderRadius: "30px",
        fontSize: "14px",
        boxShadow: "0 .125rem .25rem 0 rgba(58,59,69,.2)!important",
        border: "none"
    },
    deny: {
        background: "#e5e5e5",
        width: "20 %",
        fontSize: "14px",
        borderRadius: "30px",
        border: "none"

    },
    seeMore: {
        width: "30%",
        fontSize: "20px",
        borderRadius: "30px",

        background: "#ffc809",
        border: "none",

        boxShadow: "0 .125rem .25rem 0 rgba(58,59,69,.2)!important"
    }

})
function PendingRequests() {
    const _styles = style
    return (

        <div className="pending-requests">

            <div className="d-sm-flex align-items-center justify-content-between mb-4">

                <h2  className="m-0 font-weight-bold">Pending Requests</h2>

            </div>

            <div id="border" className="">

                <div className="card shadow mb-4 rounded-20 border-yellow border-5">
                    <div className="card-body">
                        <div className="pb-2" style={{ padding: "0 !important" }}>
                            <p className="text-secondary">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>
                            <button style={_styles.accept} id="accept" className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm btn-primary shadow-sm mr-3">Accept</button>
                            <button style={_styles.deny} className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm shadow-sm btn-danger">Deny</button>

                        </div>

                    </div>

                </div>

            </div>

            <div id="border" className="">

                <div className="card shadow mb-4 rounded-20 border-yellow border-5">
                    <div className="card-body">

                        <div className="pb-2" style={{ padding: "0 !important" }}>

                            <p className="text-secondary">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>
                            <button style={_styles.accept} id="accept" className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm btn-primary shadow-sm mr-3">Accept</button>
                            <button style={_styles.deny} className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm shadow-sm btn-danger">Deny</button>

                        </div>

                    </div>

                </div>

            </div>
            <div id="border" className="">

                <div className="card shadow mb-4 rounded-20 border-yellow border-5">

                    <div className="card-body">

                        <div className="pb-2" style={{ padding: "0 !important" }}>

                            <p className="text-secondary">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>
                            <button style={_styles.accept} id="accept" className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm btn-primary shadow-sm mr-3">Accept</button>
                            <button style={_styles.deny} className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm shadow-sm btn-danger">Deny</button>

                        </div>

                    </div>

                </div>

            </div>
            <div id="btn-top" className="mt-4 text-center small" style={{ marginBottom: "50px" }}>

                <button style={_styles.seeMore} href="#" className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm btn-primary shadow-sm">See more</button>

            </div>
        </div>
    )


}


export default PendingRequests;