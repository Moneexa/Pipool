import React from 'react'
// import './PendingRequests.css'

class PendingRequests extends React.Component {

    render() {

        return (

            <div className="pending-requests">

                <div className="d-sm-flex align-items-center justify-content-between mb-4">

                    <h2 className="m-0 font-weight-bold">Pending Requests</h2>

                </div>

                <div id="border" className="">

                    <div className="card shadow mb-4 rounded-20 border-yellow border-5">
                        <div className="card-body">
                            <div className="pb-2" style={{ padding: "0 !important" }}>
                                <p className="text-secondary">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>
                                <button id="accept" className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm btn-primary shadow-sm mr-3">Accept</button>
                                <button className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm shadow-sm btn-danger">Deny</button>

                            </div>

                        </div>

                    </div>

                </div>

                <div id="border" className="">

                    <div className="card shadow mb-4 rounded-20 border-yellow border-5">
                        <div className="card-body">

                            <div className="pb-2" style={{ padding: "0 !important" }}>

                                <p className="text-secondary">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>
                                <button id="accept" className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm btn-primary shadow-sm mr-3">Accept</button>
                                <button className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm shadow-sm btn-danger">Deny</button>

                            </div>

                        </div>

                    </div>

                </div>
                <div id="border" className="">

                    <div className="card shadow mb-4 rounded-20 border-yellow border-5">

                        <div className="card-body">

                            <div className="pb-2" style={{ padding: "0 !important" }}>

                                <p className="text-secondary">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>
                                <button id="accept" className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm btn-primary shadow-sm mr-3">Accept</button>
                                <button className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm shadow-sm btn-danger">Deny</button>

                            </div>

                        </div>

                    </div>

                </div>
                <div id="btn-top" className="mt-4 text-center small" style={{ marginBottom: "50px" }}>

                    <button href="#" className="rounded-30 px-5 text-white d-sm-inline-block btn btn-sm btn-primary shadow-sm">See more</button>

                </div>
            </div>
        )


    }


}
export default PendingRequests;