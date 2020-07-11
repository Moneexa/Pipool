import React from 'react'
import './AddChannel.css'
import TwitterVerify from '../../shared/components/TwitterVerify'
import { FacebookVerify } from '../../shared/components/FacebookVerify';
import { YoutubeVerify } from '../../shared/components/YoutubeVerify';
import { InstagramVerify } from '../../shared/components/InstagramVerify'

class AddChannel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            platform: ""
        }
    }
    onPlatformChange = (e) => {
        this.setState({
            platform: e.target.value
        })
    }
    render() {

        return (

            <div className="add-channel">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">

                    <h2 className="m-0 font-weight-bold text-primary">Add New Channel</h2>



                </div>
                {/* <FacebookVerify /> */}
                <TwitterVerify />
                <InstagramVerify />
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
                            <select onChange={this.onPlatformChange} className="browser-default custom-select h-auto pad-12" id="category" name="category">
                                <option selected>Select</option>
                                <option value="1">Youtube</option>
                                <option value="2">Twitter</option>
                                <option value="3">Instagram</option>
                                <option value="4">Linkdin</option>

                            </select>
                        </div>
                        <div className="form-group col-sm-6 mb-3 mb-sm-0">
                            {
                                () => {
                                    if (this.state.platform === "Youtube")
                                        return (<YoutubeVerify />)
                                    else if(this.state.platform==="Twitter")
                                         return(<TwitterVerify />)
                                    else if(this.state.platform==="Instagram")
                                          return(<InstagramVerify />)         
                                }

                            }
                        </div>

                        <div className="form-group col-sm-6 mb-3 mb-sm-0">
                            <label>Upload the image *</label>
                            {/* <input style={{border: "none", padding: "5px 21px"}} type="file" placeholder="Enter the name" className="form-control form-control-user" /> */}
                            <div className="custom-file channel-logo">
                                <input type="file" className="custom-file-input" id="inputGroupFile01" />
                                <label className="custom-file-label mt-0" htmlFor="inputGroupFile01"></label>
                            </div>
                        </div>

                        <div className="form-group col-sm-12 mb-3 mb-sm-0">
                            <label>Message *</label>
                            <textarea className="form-control form-control-user" name="S_service" id="S_service" placeholder="Description"></textarea>

                        </div>
                        <button className="btn btn-primary btn-user btn-block rounded-30"> SEND</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default AddChannel