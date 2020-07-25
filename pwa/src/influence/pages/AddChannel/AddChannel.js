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
            platform: "",
            category:""
        }
    }
    onPlatformChange = (e) => {
        this.setState({
            platform: e.target.value
        })
    }
    onCategoryChange=(e)=>{
        this.setState({
            category: e.target.value
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
                                <select className="browser-default custom-select h-auto pad-12" id="category" name="category" value={this.state.category} onChange={this.onCategoryChange}>
                                    <option selected>Select</option>
                                    <option value="Animal">Animal</option>
                                    <option value="Art">Art</option>
                                    <option value="Beauty">Beauty</option>
                                    <option value="Books">Books</option>
                                    <option value="Business">Business</option>
                                    <option value="Causes">Causes</option>
                                    <option value="Comedy">Comedy</option>
                                    <option value="Dance">Dance</option>
                                    <option value="DIY">DIY</option>
                                    <option value="Education">Education</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Family">Family</option>
                                    <option value="Fashion">Fashion</option>
                                    <option value="Film">Film</option>
                                    <option value="Fitness">Fitness</option>
                                    <option value="Food">Food</option>
                                    <option value="Gaming">Gaming</option>
                                    <option value="Lifestyle">Lifestyle</option>
                                    <option value="Music">Music</option>
                                    <option value="News">News</option>
                                    <option value="Photograpy">Photograpy</option>
                                    <option value="Politics">Politics</option>
                                    <option value="Science">Science</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Tech">Tech</option>
                                    <option value="Travel">Travel</option>
                                    <option value="TV">TV</option>

                                </select>

                            <div className="row">
                               <div className="col-md-3 my-3"><InstagramVerify category={this.state.category}/> </div>
                               <div className="col-md-2 my-3"><YoutubeVerify category={this.state.category} /> </div>
                               <div className="col-md-3 my-3"><TwitterVerify category={this.state.category}/> </div>
                               <div className="col-md-2 my-3"><TiktokVerify  category={this.state.category}/> </div>
                               <div className="col-md-2 my-3"><FacebookVerify category={this.state.category} /> </div>

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