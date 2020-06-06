import React from 'react'

import './Help.css'

class Help extends React.Component {
    render() {

        return (<div className="help">

            <div className="d-sm-flex align-items-center justify-content-between mb-4">

                <h2 className="m-0 font-weight-bold text-primary">Help & FAQ</h2>

                <form className="form-inline d-flex justify-content-center md-form form-sm mt-0">
                    <i className="fas fa-search" aria-hidden="true"></i>
                    <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search"
                        aria-label="Search" />
                </form>
            </div>


            <div id="border" className="col-xl-12 col-lg-5">

                <div className="card shadow mb-4">

                    <div className="card-body">

                        <div className="pt-4 pb-2" style={{ padding: "0 !important" }}>
                            <h4>What is the meaning of Lorem ipsum?</h4>

                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>


                        </div>

                    </div>

                </div>

            </div>


            <div id="border" className="col-xl-12 col-lg-5">

                <div className="card shadow mb-4">

                    <div className="card-body">

                        <div className="pt-4 pb-2" style={{ padding: "0 !important" }}>
                            <h4>What is the meaning of Lorem ipsum?</h4>

                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>


                        </div>

                    </div>

                </div>

            </div>


            <div id="border" className="col-xl-12 col-lg-5">

                <div className="card shadow mb-4">

                    <div className="card-body">

                        <div className="pt-4 pb-2" style={{ padding: "0 !important" }}>
                            <h4>What is the meaning of Lorem ipsum?</h4>

                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>


                        </div>

                    </div>

                </div>

            </div>


            <div id="border" className="col-xl-12 col-lg-5">

                <div className="card shadow mb-4">

                    <div className="card-body">

                        <div className="pt-4 pb-2" style={{ padding: "0 !important" }}>
                            <h4>What is the meaning of Lorem ipsum?</h4>

                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>


                        </div>

                    </div>

                </div>

            </div>


            <div id="border" className="col-xl-12 col-lg-5">

                <div className="card shadow mb-4">
                    <div className="card-body">

                        <div className="pt-4 pb-2" style={{ padding: "0 !important" }}>
                            <h4>What is the meaning of Lorem ipsum?</h4>

                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown.</p>


                        </div>

                    </div>

                </div>

            </div>
            <form className="user">

                <div className="form-group row">
                    <div className="form-group col-sm-6 mb-3 mb-sm-0">
                        <label>Your name *</label>
                        <input type="text" className="form-control form-control-user" name="service" id="service" placeholder="Enter your name" />
                    </div>

                    <div className="form-group col-sm-6 mb-3 mb-sm-0">
                        <label>Your Email *</label>
                        <input type="text" className="form-control form-control-user" name="service" id="service" placeholder="Enter your email" />
                    </div>

                    <div className="form-group col-sm-12 mb-3 mb-sm-0">
                        <label>Message *</label>
                        <textarea className="form-control form-control-user" name="S_service" id="S_service" placeholder="Description"></textarea>

                    </div>


                    <button className="btn btn-primary btn-user btn-block"> SEND</button>
                </div>

                <div id="btn-top" className="mt-4 text-center small" style={{ marginBottom: "50px" }}>
                    <h3 className="m-0 font-weight-bold text-primary">Choose to Talk</h3>
                    <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Live Chat</button>
                    <button className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">Submit a Ticket</button>

                </div>







            </form>


        </div>

        )










    }


}
export default Help