import React from 'react'

class AddBrand extends React.Component {
    render() {

        return (

            <div className="add-brand">

                <div className="text-center">

                    <h1 className="h4 text-gray-900 mb-4">Add a New Brand</h1>

                </div>

                <form className="user" method="post" enctype="multipart/form-data">



                    <div className="form-group row">

                        <div className="form-group col-sm-6 mb-3 mb-sm-0 files">
                            <label>
                                <strong> Upload your logo *</strong>
                            </label>

                            <input type="file" name="clogo" class="form-control form-control-user" multiple="" />
                        </div>

                        <div className="form-group col-sm-6 mb-3 mb-sm-0">
                            <label><strong>Brand name *</strong></label>

                            <input type="text" name="brand_nm" class="form-control form-control-user" id="exampleInputEmail" placeholder="Enter the name of your brand" />
                            <p style={{color: "red"}}></p>

                            <label><strong>Tell us about your brand *</strong></label>

                            <textarea className="form-control form-control-user" name="brand_desc" id="" placeholder="This description should help influencers understand more about you brand, try to be as clear as possible."></textarea>
                            <p style={{color: "red"}}></p>

                            <label><strong>Website</strong></label>
                            <input type="text" name="website_url" class="form-control form-control-user" placeholder="http://" />
                            <p style={{color: "red"}}></p>

                            <label><strong>Skype (optional)</strong></label>
                            <input type="text" name="skype_id" class="form-control form-control-user" placeholder="Enter your skype name or e-mail address" />

                            <label><strong>Contact name *</strong></label>
                            <input type="text" name="contact_nm" class="form-control form-control-user" placeholder="First and last name of the contact" />
                            <p style={{color: "red"}}></p>

                            <label><strong>Hashtags *</strong></label>
                            <input type="text" name="contact_nm" class="form-control form-control-user" placeholder="Hashtags" value="" />


                            <label><strong>Phone number *</strong></label>
                            <input type="text" name="contact_no" class="form-control form-control-user" placeholder="Enter a phone number" />
                            <p style={{color: "red"}}></p>

                            <label><strong>Address *</strong></label>
                            <input type="text" name="address" class="form-control form-control-user" />
                            <p style={{color: "red"}}></p>


                            <label><strong>Postal code *</strong></label>
                            <input type="text" name="postal_code" class="form-control form-control-user" />
                            <p style={{color: "red"}}></p>

                            <label><strong>City *</strong></label>
                            <input type="text" name="city_brand" class="form-control form-control-user" />
                            <p style={{color: "red"}}></p>

                            <label><strong>Country *</strong></label>
                            <input type="text" name="country_brand" class="form-control form-control-user" />
                            <p style={{color: "red"}}></p>
                        </div>
                    </div>
                    <button name="brand_save" class="btn btn-primary btn-user btn-block">Save</button>
                </form>










            </div>






        )









    }




}
export default AddBrand