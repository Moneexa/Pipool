import React from 'react'
import './AddChannel.css'
import TwitterVerify from '../../shared/components/TwitterVerify'
import { FacebookVerify } from '../../shared/components/FacebookVerify';
import { YoutubeVerify } from '../../shared/components/YoutubeVerify';
import { InstagramVerify } from '../../shared/components/InstagramVerify'
import {TiktokVerify} from '../../shared/components/TiktokVerify'
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

                <form className="user">

                    <div className="form-group">
                        

                        <div className="form-group m-3 mb-sm-0">
                        <div className="col-md-12">
                                <label>Selelct Channel Category*</label>
                                <select className="browser-default custom-select h-auto pad-12" id="category" name="category">
                                    <option selected>Select</option>
                                    <option value="1">Animal</option>
                                    <option value="2">Art</option>
                                    <option value="3">Beauty</option>
                                    <option value="4">Books</option>
                                    <option value="5">Business</option>
                                    <option value="6">Causes</option>
                                    <option value="8">Comedy</option>
                                    <option value="9">Dance</option>
                                    <option value="10">DIY</option>
                                    <option value="11">Education</option>
                                    <option value="12">Entertainment</option>
                                    <option value="13">Family</option>
                                    <option value="14">Fashion</option>
                                    <option value="15">Film</option>
                                    <option value="16">Fitness</option>
                                    <option value="17">Food</option>
                                    <option value="18">Gaming</option>
                                    <option value="19">Lifestyle</option>
                                    <option value="20">Music</option>
                                    <option value="21">News</option>
                                    <option value="22">Photograpy</option>
                                    <option value="23">Politics</option>
                                    <option value="24">Science</option>
                                    <option value="25">Sports</option>
                                    <option value="26">Tech</option>
                                    <option value="27">Travel</option>
                                    <option value="28">TV</option>

                                </select>

                            <div className="row">
                               <div className="col-md-3 my-3"><InstagramVerify /> </div>
                               <div className="col-md-3 my-3"><YoutubeVerify /> </div>
                               <div className="col-md-3 my-3"><TwitterVerify /> </div>
                               <div className="col-md-3 my-3"><TiktokVerify /> </div>

                               </div>

                               

                            </div>
                        </div>


                        
                    </div>
                </form>
            </div>
        )
    }
}
export default AddChannel