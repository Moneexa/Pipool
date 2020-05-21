import React from 'react'

class NewCampaign extends React.Component {
    render() {

        return (
            <div className="new-campaign">

                <div class="text-center">
                    <h1 className="h4 text-gray-900 mb-4">CREATE A CAMPAIGN</h1>
                    <p>Describe your product or service to the influencers.</p>
                </div>


                <form className="user">

                    <div className="form-group row">
                        <div className="form-group col-sm-6 mb-3 mb-sm-0">
                            <label>Product or service name *</label>
                            <input type="text" class="form-control form-control-user" name="service" id="service" placeholder="Enter the name of your product or service" />



                            <label>Product or service description *</label>
                            <textarea className="form-control form-control-user" name="S_service" id="S_service" placeholder="Describe your product or service as if your audience is new to it. On the next steps, you'll be able to describe the content you'd like from our influencers. "></textarea>


                            <label>Category *</label>
                            <select className="browser-default custom-select" id="category" name="category">
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>

                        <div className="form-group col-sm-6 mb-3 mb-sm-0">
                            <label>Set your campaign Cover Image *</label>
                            <input style={{ border: "none", padding: "5px 21px" }} type="file" placeholder="Enter the name" class="form-control form-control-user" />
                            <div id="bac_img">
                                <img src="../img/logo-ip.png" style={{ borderRadius: "80px", padding: "10px" }} />

                            </div>
                        </div>
                        <button className="btn btn-primary btn-user btn-block"> Next</button>
                    </div>

                    <div className="form-group row" >
                        <div className="form-group col-sm-6 mb-3 mb-sm-0">
                            <label>Call for action *</label>
                            <input type="text" className="form-control form-control-user" id="exampleInputEmail" placeholder="Describe in a simple sentence what you request from the influencers" />



                            <label>Brief the influencers *</label>
                            <textarea className="form-control form-control-user" id="exampleInputEmail" placeholder="Describe the content you'd like from our influencers. Try to be as clear as possible to avoid out of context content from the influencers"></textarea>




                            <label>Do </label>
                            <input type="text" class="form-control form-control-user" id="exampleInputEmail" placeholder="Add a rule - press enter to confirm" />



                            <label>Don't </label>
                            <input type="text" class="form-control form-control-user" id="exampleInputEmail" placeholder="Add a rule - press enter to confirm" />



                            <label>Caption example (Optional)  </label>
                            <input type="text" class="form-control form-control-user" id="exampleInputEmail" placeholder="Describe in a simple sentence what you request from the influencers" />
                        </div>

                        <div class="form-group col-sm-6 mb-3 mb-sm-0">
                            <div id="bacground_box">
                                <p>Does the influencer need the product ?</p>
                                <label><input type="radio" name="optradio" checked /> No, the influencers don’t need to physically have the product. </label><br />
                                <label><input type="radio" name="optradio" checked /> Yes, the influencers and the product must appear on the post </label><br />
                                <label><input type="radio" name="optradio" checked />  You will send the product sample to the influencers </label><br />
                                <label><input type="checkbox" value="" /> The influencers will need to return the product (high value or prototype) </label>
                                <label><input type="radio" name="optradio" checked />  The influencers should purchase or already own the product  </label>
                            </div>
                            <div id="upload_btn" className="form-group row" >
                                <div className="form-group col-sm-4 mb-3 mb-sm-0">
                                    <input style={{ border: "none", padding: "5px 21px" }} type="file" placeholder="Enter the name" class="form-control form-control-user" />

                                </div>
                                <div class="form-group col-sm-4 mb-3 mb-sm-0">
                                    <input style={{ border: "none", padding: "5px 21px" }} type="file" placeholder="Enter the name" class="form-control form-control-user" />

                                </div>
                                <div className="form-group col-sm-4 mb-3 mb-sm-0">
                                    <input style={{ border: "none", padding: "5px 21px" }} type="file" placeholder="Enter the name" class="form-control form-control-user" />

                                </div>
                                <div class="form-group col-sm-4 mb-3 mb-sm-0">
                                    <input style={{ border: "none", padding: "5px 21px" }} type="file" placeholder="Enter the name" class="form-control form-control-user" />

                                </div>
                                <div class="form-group col-sm-4 mb-3 mb-sm-0">
                                    <input style={{ border: "none", padding: "5px 21px" }} type="file" placeholder="Enter the name" class="form-control form-control-user" />

                                </div>
                                <div class="form-group col-sm-4 mb-3 mb-sm-0">
                                    <input style={{ border: "none", padding: "5px 21px" }} type="file" placeholder="Enter the name" class="form-control form-control-user" />

                                </div>
                                <div class="form-group col-sm-4 mb-3 mb-sm-0">
                                    <input style={{ border: "none", padding: "5px 21px" }} type="file" placeholder="Enter the name" class="form-control form-control-user" />

                                </div>
                                <div class="form-group col-sm-4 mb-3 mb-sm-0">
                                    <input style={{ border: "none", padding: "5px 21px" }} type="file" placeholder="Enter the name" class="form-control form-control-user" />

                                </div>
                                <div class="form-group col-sm-4 mb-3 mb-sm-0">
                                    <input style={{ border: "none", padding: "5px 21px" }} type="file" placeholder="Enter the name" class="form-control form-control-user" />

                                </div>
                            </div>
                        </div>
                        <button class="btn btn-primary btn-user btn-block"> Next</button>
                    </div>


                    <div class="form-group row" >
                        <div class="form-group col-sm-2 mb-3 mb-sm-0">
                        </div>
                        <div class="form-group col-sm-8 mb-3 mb-sm-0">
                            <p style={{fontSize: "22px",textAlign: "center"}}> Here you can set the criteria that will define the selection of influencers to whom your campaign will be visible to. Interested influencers will then send you post proposals for approval. </p>                    </div>
                        <div class="form-group col-sm-2 mb-3 mb-sm-0">
                        </div>


                    </div>
                    <div class="form-group row" >
                        <div class="form-group col-sm-6 mb-3 mb-sm-0">
                            <label>Gender</label>
                            <select class="browser-default custom-select" id="gender" name="gender">
                                <option value="1">Any</option>
                                <option value="2">Male</option>
                                <option value="3">Female</option>
                            </select>
                        </div>
                        <div class="form-group col-sm-6 mb-3 mb-sm-0">
                            <label>Location</label>
                            <select class="browser-default custom-select" id="location" name="location">
                                <option value="1">Region</option>
                                <option value="2">Northern America</option>
                                <option value="3">Western Europe</option>
                                <option value="3">Eastern Europe</option>
                                <option value="3">Australia and New Zealand</option>
                                <option value="3">Asia</option>
                            </select>


                        </div>
                    </div>

                    <div class="form-group row" >
                        <div class="form-group col-sm-6 mb-3 mb-sm-0">
                            <label>Age</label><br />
                            <input type="range" min="1" max="100" value="50" class="slider" id="myRange" />
                        </div>
                        <div className="form-group col-sm-6 mb-3 mb-sm-0">
                            <label>Posting languages</label>
                            <select class="browser-default custom-select" id="location" name="location">
                                <option value="1">English</option>
                                <option value="2">French</option>
                                <option value="3">Spanish</option>
                                <option value="3">Italian</option>
                                <option value="3">Chinese</option>
                                <option value="3">Portuguese</option>
                                <option value="3">Russian</option>
                                <option value="3">German</option>
                            </select>


                        </div>
                    </div>
                    <div class="form-group row" >
                        <div class="form-group col-sm-6 mb-3 mb-sm-0">
                            <label>Minimum number of followers </label><br />
                            <input type="range" min="1" max="100" value="50" class="slider" id="myRange" />
                        </div>
                    </div>

                    <div class="form-group row" >
                        <hr style={{ border: "1px solid #f0f0f0 !important", width: "100%" }} />
                    </div>

                    <div class="form-group row" >
                        <div class="form-group col-sm-12 mb-3 mb-sm-0">
                            Include influencers with interests in :
         </div>
                    </div>
                    <div class="form-group row" >
                        <div id="img_row" class="form-group col-sm-12 mb-3 mb-sm-0">
                            <div class="clearfix">
                                <button class="select"> </button>

                                <button class="send " data-counter="0">✔</button>
                            </div>
                            <ul>
                                <li><img src="https://farm8.staticflickr.com/7326/11287113923_57d37ed9d3_q.jpg" /></li>
                                <li><img src="https://farm9.staticflickr.com/8184/8095683964_9e27753908_q.jpg" /></li>
                                <li><img src="https://farm9.staticflickr.com/8171/8018956825_67bf62c098_q.jpg" /></li>
                                <li><img src="https://farm9.staticflickr.com/8425/7587724752_cdb9f0c444_q.jpg" /></li>
                                <li><img src="https://farm8.staticflickr.com/7248/7587738254_707a32f27b_q.jpg" /></li>
                                <li><img src="https://farm9.staticflickr.com/8191/8095680852_893f685cbd_q.jpg" /></li>
                                <li><img src="https://farm9.staticflickr.com/8460/8018953043_c6ef9e3b29_q.jpg" /></li>
                                <li><img src="https://farm9.staticflickr.com/8026/7445019824_914dea4ac3_q.jpg" /></li>
                                <li><img src="https://farm8.staticflickr.com/7088/7332137562_14956827a7_q.jpg" /></li>
                                <li><img src="https://farm8.staticflickr.com/7108/7151306497_9cfb1a367b_q.jpg" /></li>
                                <li><img src="https://farm6.staticflickr.com/5198/7005209880_432389ef25_q.jpg" /></li>
                                <li><img src="https://farm8.staticflickr.com/7280/7151302883_e6ef32f04d_q.jpg" /></li>
                            </ul>
                        </div>
                    </div>


                </form>
            </div>
                    



)





    }




}
export default NewCampaign;