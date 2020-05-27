import React from 'react'
import { useStyles } from 'react-styles-hook'
import './Campaign.css';
const styles = useStyles({
    bacImage: {
        backgroundImage: "url('../img/fQ3sE2ESryyBsVqTCOmHLOXeAAFvY6F2llcYtQEc.png')",
        backgroundSize: "cover",
        minHeight: "240px",
        backgroundPosition: "bottom"
    },
    nextButton: {
        background: "#ffc400",
        border: "0",

        fontSize: ".8rem",
        borderRadius: "10rem",
        padding: ".75rem 1rem",
        margin: "10px",

    },
    backgroundBox: {
        background: "#252c34",
        padding: "20px",
        boxSizing: "border-box",
        fontStyle:"oblique",
    },
    callForAction: {
        margin: "10px 0px 4px 21px",
        fontStyle: "oblique",

        display: "inline-block",
        marginBottom: ".5rem",
        boxSizing: "border-box"
    },
    simpleSentenceInput: {
        fontSize: ".8rem",
        borderRadius: "10rem",
        padding: "1.5rem 1rem",
        display: "block",
        width: "100%",
        height: "calc(1.5em + .75rem + 2px)",
        fontWeight: "400",
        lineHeight: "1.5",
        color: "#6e707e",
        backgroundColor: "#fff",
        backgroundClip: "padding-box",
        border: "1px solid #d1d3e2",
        transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
    },
    chooseFileForm: {
        marginBottom: "1rem",

        display: "flex",
        flexWrap: "wrap",
        marginRight: "-.75rem",
        marginLeft: "-.75rem",

        boxSizing: "border-box"
    },
    chooseFileDiv: {
        marginTop: "30px",
        marginBottom: "0!important"
    },
    chooseFileButton: {
        padding: "5px !important",
        fontSize: ".8rem",
        borderRadius: "10rem",
        border: "transparent"
    },
    selectButton: {
        float: "left",
        background: "#435a6b",
        content: "select all",
        cursor: "pointer",
        width: "150px",
        height: "45px",
        margin: "0 7px",
        padding: "5px 0",
        fontWeight: "700",
        fontSize: "15px",
        letterSpacing: "2px",
        color: "#fff",
        border: "0",
        borderRadius: "2px",
        textRransform: "uppercase",
        outline: "0"
    },
    checkMark: {
        float: "right",
        background: "#aaa",
        padding: "0px 15px",
        height: "45px",
        width: "45px",
        margin: "0 7px",
        padding: "5px 0",
        fontSize: "15px",
        letterSpacing: "2px",
        color: "#fff",
        border: "0",
        borderRadius: "2px",
        textTransform: "uppercase",
        outline: "0",
        WebkitTransition: "0.3s linear"

    },
    ul: {
        marginTop: "0",
        marginBottom: "1rem"
    },
    li: {
        position: "relative",
        margin: "10px",
        width: "157px",
        height: "157px",
        float: "left",
        listStyle: "none",
        boxSizing: "border-box"
    },
    firstForm: {
        fontSize: ".8rem",
        borderRadius: "10rem",
        padding: "1.5rem 1rem"
    },
    firstFormLabels: {
        margin: "10px 0px 4px 21px",
        fontStyle: "oblique",

        display: "inline-block"
    }


})
function NewCampaign() {

    const _styles = styles;
    return (
        <div className="new-campaign">

            <div className="text-center">
                <h1 style={{color:"#3a3b45!important"}}className="h4 text-gray-900 mb-4">CREATE A CAMPAIGN</h1>
                <p>Describe your product or service to the influencers.</p>
            </div>


            <form className="user">

                <div className="form-group row">
                    <div className="form-group col-sm-6 mb-3 mb-sm-0">
                        <label style={_styles.firstFormLabels}>Product or service name *</label>
                        <input style={_styles.firstForm} type="text" className="form-control form-control-user" name="service" id="service" placeholder="Enter the name of your product or service" />



                        <label style={_styles.firstFormLabels}>Product or service description *</label>
                        <textarea style={_styles.firstForm} className="form-control form-control-user" name="S_service" id="S_service" placeholder="Describe your product or service as if your audience is new to it. On the next steps, you'll be able to describe the content you'd like from our influencers. "></textarea>


                        <label style={_styles.firstFormLabels}>Category *</label>
                        <select style={_styles.firstForm} className="browser-default custom-select" id="category" name="category">
                            <option defaultValue="Open this select menu">Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>

                    <div className="form-group col-sm-6 mb-3 mb-sm-0">
                        <label style={_styles.firstFormLabels}>Set your campaign Cover Image *</label>
                        <input style={{ border: "none", padding: "5px 21px" }} type="file" placeholder="Enter the name" className="form-control form-control-user" />
                        <div id="bac_img" style={_styles.bacImage}>
                            <img src="../img/logo-ip.png" style={{ borderRadius: "80px", padding: "10px" }} />

                        </div>
                    </div>
                    <button style={_styles.nextButton} className="btn btn-primary btn-user btn-block"> Next</button>
                </div>

                <div className="form-group row" >
                    <div className="form-group col-sm-6 mb-3 mb-sm-0">
                        <label style={_styles.callForAction} >Call for action *</label>
                        <input style={_styles.simpleSentenceInput} type="text" className="form-control form-control-user" id="exampleInputEmail" placeholder="Describe in a simple sentence what you request from the influencers" />



                        <label style={_styles.callForAction}>Brief the influencers *</label>
                        <textarea style={_styles.simpleSentenceInput} className="form-control form-control-user" id="exampleInputEmail" placeholder="Describe the content you'd like from our influencers. Try to be as clear as possible to avoid out of context content from the influencers"></textarea>




                        <label style={_styles.callForAction}>Do </label>
                        <input style={_styles.simpleSentenceInput} type="text" className="form-control form-control-user" id="exampleInputEmail" placeholder="Add a rule - press enter to confirm" />



                        <label style={_styles.callForAction}>Don't </label>
                        <input style={_styles.simpleSentenceInput} type="text" className="form-control form-control-user" id="exampleInputEmail" placeholder="Add a rule - press enter to confirm" />



                        <label style={_styles.callForAction} >Caption example (Optional)  </label>
                        <input style={_styles.simpleSentenceInput} type="text" className="form-control form-control-user" id="exampleInputEmail" placeholder="Describe in a simple sentence what you request from the influencers" />
                    </div>

                    <div className="form-group col-sm-6 mb-3 mb-sm-0">
                        <div style={_styles.backgroundBox} id="bacground_box">
                            <p>Does the influencer need the product ?</p>
                            <label><input type="radio" name="optradio" checked /> No, the influencers don’t need to physically have the product. </label><br />
                            <label><input type="radio" name="optradio" checked /> Yes, the influencers and the product must appear on the post </label><br />
                            <label><input type="radio" name="optradio" checked />  You will send the product sample to the influencers </label><br />
                            <label><input type="checkbox" value="" /> The influencers will need to return the product (high value or prototype) </label>
                            <label><input type="radio" name="optradio" checked />  The influencers should purchase or already own the product  </label>
                        </div>
                        <div id="upload_btn" style={_styles.chooseFileForm} className="form-group row" >
                            <div style={_styles.chooseFileDiv} className="form-group col-sm-4 mb-3 mb-sm-0">
                                <input style={_styles.chooseFileButton} type="file" placeholder="Enter the name" className="form-control form-control-user" />

                            </div>
                            <div style={_styles.chooseFileDiv} className="form-group col-sm-4 mb-3 mb-sm-0">
                                <input style={_styles.chooseFileButton} type="file" placeholder="Enter the name" className="form-control form-control-user" />

                            </div>
                            <div style={_styles.chooseFileDiv} className="form-group col-sm-4 mb-3 mb-sm-0">
                                <input style={_styles.chooseFileButton} type="file" placeholder="Enter the name" className="form-control form-control-user" />

                            </div>
                            <div style={_styles.chooseFileDiv} className="form-group col-sm-4 mb-3 mb-sm-0">
                                <input style={_styles.chooseFileButton} type="file" placeholder="Enter the name" className="form-control form-control-user" />

                            </div>
                            <div style={_styles.chooseFileDiv} className="form-group col-sm-4 mb-3 mb-sm-0">
                                <input style={_styles.chooseFileButton} type="file" placeholder="Enter the name" className="form-control form-control-user" />

                            </div>
                            <div style={_styles.chooseFileDiv} className="form-group col-sm-4 mb-3 mb-sm-0">
                                <input style={_styles.chooseFileButton} type="file" placeholder="Enter the name" className="form-control form-control-user" />

                            </div>
                            <div style={_styles.chooseFileDiv} className="form-group col-sm-4 mb-3 mb-sm-0">
                                <input style={_styles.chooseFileButton} type="file" placeholder="Enter the name" className="form-control form-control-user" />

                            </div>
                            <div style={_styles.chooseFileDiv} className="form-group col-sm-4 mb-3 mb-sm-0">
                                <input style={_styles.chooseFileButton} type="file" placeholder="Enter the name" className="form-control form-control-user" />

                            </div>
                            <div style={_styles.chooseFileDiv} className="form-group col-sm-4 mb-3 mb-sm-0">
                                <input style={_styles.chooseFileButton} type="file" placeholder="Enter the name" className="form-control form-control-user" />

                            </div>
                        </div>
                    </div>
                    <button style={_styles.nextButton} className="btn btn-primary btn-user btn-block"> Next</button>
                </div>


                <div className="form-group row" >
                    <div className="form-group col-sm-2 mb-3 mb-sm-0">
                    </div>
                    <div className="form-group col-sm-8 mb-3 mb-sm-0">
                        <p style={{ fontSize: "22px", textAlign: "center" }}> Here you can set the criteria that will define the selection of influencers to whom your campaign will be visible to. Interested influencers will then send you post proposals for approval. </p>                    </div>
                    <div className="form-group col-sm-2 mb-3 mb-sm-0">
                    </div>


                </div>
                <div className="form-group row" >
                    <div className="form-group col-sm-6 mb-3 mb-sm-0">
                        <label>Gender</label>
                        <select className="browser-default custom-select" id="gender" name="gender">
                            <option value="1">Any</option>
                            <option value="2">Male</option>
                            <option value="3">Female</option>
                        </select>
                    </div>
                    <div className="form-group col-sm-6 mb-3 mb-sm-0">
                        <label>Location</label>
                        <select className="browser-default custom-select" id="location" name="location">
                            <option value="1">Region</option>
                            <option value="2">Northern America</option>
                            <option value="3">Western Europe</option>
                            <option value="3">Eastern Europe</option>
                            <option value="3">Australia and New Zealand</option>
                            <option value="3">Asia</option>
                        </select>


                    </div>
                </div>

                <div className="form-group row" >
                    <div className="form-group col-sm-6 mb-3 mb-sm-0">
                        <label>Age</label><br />
                        <input type="range" min="1" max="100" value="50" className="slider" id="myRange" />
                    </div>
                    <div className="form-group col-sm-6 mb-3 mb-sm-0">
                        <label>Posting languages</label>
                        <select className="browser-default custom-select" id="location" name="location">
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
                <div className="form-group row" >
                    <div className="form-group col-sm-6 mb-3 mb-sm-0">
                        <label>Minimum number of followers </label><br />
                        <input type="range" min="1" max="100" value="50" className="slider" id="myRange" />
                    </div>
                </div>

                <div className="form-group row" >
                    <hr style={{ border: "1px solid #f0f0f0 !important", width: "100%" }} />
                </div>

                <div className="form-group row" >
                    <div className="form-group col-sm-12 mb-3 mb-sm-0">
                        Include influencers with interests in :
         </div>
                </div>
                <div className="form-group row" >
                    <div id="img_row" className="form-group col-sm-12 mb-3 mb-sm-0">
                        <div className="clearfix">
                            <button className="select" style={_styles.selectButton}> </button>

                            <button style={_styles.checkMark} className="send " data-counter="0">✔</button>
                        </div>
                        <ul style={_styles.ul}>
                            <li style={_styles.li}><img src="https://farm8.staticflickr.com/7326/11287113923_57d37ed9d3_q.jpg" /></li>
                            <li style={_styles.li}><img src="https://farm9.staticflickr.com/8184/8095683964_9e27753908_q.jpg" /></li>
                            <li style={_styles.li}><img src="https://farm9.staticflickr.com/8171/8018956825_67bf62c098_q.jpg" /></li>
                            <li style={_styles.li}><img src="https://farm9.staticflickr.com/8425/7587724752_cdb9f0c444_q.jpg" /></li>
                            <li style={_styles.li}><img src="https://farm8.staticflickr.com/7248/7587738254_707a32f27b_q.jpg" /></li>
                            <li style={_styles.li}> <img src="https://farm9.staticflickr.com/8191/8095680852_893f685cbd_q.jpg" /></li>
                            <li style={_styles.li}><img src="https://farm9.staticflickr.com/8460/8018953043_c6ef9e3b29_q.jpg" /></li>
                            <li style={_styles.li}><img src="https://farm9.staticflickr.com/8026/7445019824_914dea4ac3_q.jpg" /></li>
                            <li style={_styles.li}><img src="https://farm8.staticflickr.com/7088/7332137562_14956827a7_q.jpg" /></li>
                            <li style={_styles.li}><img src="https://farm8.staticflickr.com/7108/7151306497_9cfb1a367b_q.jpg" /></li>
                            <li style={_styles.li}><img src="https://farm6.staticflickr.com/5198/7005209880_432389ef25_q.jpg" /></li>
                            <li style={_styles.li}><img src="https://farm8.staticflickr.com/7280/7151302883_e6ef32f04d_q.jpg" /></li>
                        </ul>
                    </div>
                </div>


            </form>
        </div>

    )
}
export default NewCampaign;