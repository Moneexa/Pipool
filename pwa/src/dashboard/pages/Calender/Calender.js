import React from 'react'
import './Calender.css'


class Calender extends React.Component {
    render() {
        return (<div className="calender">

            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h2 className="m-0 font-weight-bold text-primary">Calender</h2>
            </div>
            <div id="border" className="col-xl-12 col-lg-5">

                <div className="card shadow mb-4">
                    <div className="card-body">
                        <div className="pt-4 pb-2" style={{ padding: "0 ! important" }}>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}
export default Calender