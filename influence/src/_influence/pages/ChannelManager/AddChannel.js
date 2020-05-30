import React from 'react'
import './AddChannel.css'
class AddChannel extends React.Component {
    render() {

        return (

            <div className="add-channel">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">

                    <h2 className="m-0 font-weight-bold text-primary">Add New Channel</h2>


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

                        <div className="form-group col-sm-6 mb-3 mb-sm-0">
                            <label>Selelct Channel *</label>
                            <select className="browser-default custom-select" id="category" name="category">
                                <option selected>Select</option>
                                <option value="1">Youtube</option>
                                <option value="2">Twitter</option>
                                <option value="3">Instagram</option>
                                <option value="4">Linkdin</option>

                            </select>
                        </div>

                        <div className="form-group col-sm-6 mb-3 mb-sm-0">
                            <label>Upload the image *</label>
                            <input style={{border: "none", padding: "5px 21px"}} type="file" placeholder="Enter the name" className="form-control form-control-user" />
                        </div>

                        <div className="form-group col-sm-12 mb-3 mb-sm-0">
                            <label>Message *</label>
                            <textarea className="form-control form-control-user" name="S_service" id="S_service" placeholder="Description"></textarea>

                        </div>
                        <button className="btn btn-primary btn-user btn-block"> SEND</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default AddChannel