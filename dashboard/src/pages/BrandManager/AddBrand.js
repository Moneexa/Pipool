import React from 'react'
import { styles } from '../Calender/Calender.css'

class AddBrand extends React.Component {
    render() {

        return (

            <div className="add-brand">
                <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Add a New Brand</h1>
                </div>
                <form style={styles.userForm} method="post" enctype="multipart/form-data">

                    <div className="form-group row">

                        <div className="form-group col-xs-12 col-lg-3">
                            <label htmlFor="basic-url">
                                <strong>Upload your logo *</strong>
                            </label>
                            <div className="input-group mb-3">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="inputGroupFile01" />
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">Choose a file</label>
                                </div>
                            </div>
                        </div>

                        <div className="form-group col-xs-12 col-lg-9 mb-3 mb-sm-0">
                            <label><strong>Brand name *</strong></label>

                            <input type="text" name="brand_nm" className="form-control form-control-user" id="exampleInputEmail" placeholder="Enter the name of your brand" />
                            <p style={{color: "red"}}></p>

                            <label><strong>Tell us about your brand *</strong></label>

                            <textarea className="form-control form-control-user" name="brand_desc" id="" placeholder="This description should help influencers understand more about you brand, try to be as clear as possible."></textarea>
                            <p style={{color: "red"}}></p>

                            <label><strong>Website</strong></label>
                            <input type="text" name="website_url" className="form-control form-control-user" placeholder="http://" />
                            <p style={{color: "red"}}></p>

                            <label><strong>Skype (optional)</strong></label>
                            <input type="text" name="skype_id" className="form-control form-control-user" placeholder="Enter your skype name or e-mail address" />

                            <label><strong>Contact name *</strong></label>
                            <input type="text" name="contact_nm" className="form-control form-control-user" placeholder="First and last name of the contact" />
                            <p style={{color: "red"}}></p>

                            <label><strong>Hashtags *</strong></label>
                            <input type="text" name="contact_nm" className="form-control form-control-user" placeholder="Hashtags" value="" />
                            <label><strong>Phone number *</strong></label>
                            <input type="text" name="contact_no" className="form-control form-control-user" placeholder="Enter a phone number" />
                            <p style={{color: "red"}}></p>

                            <label><strong>Address *</strong></label>
                            <input type="text" name="address" className="form-control form-control-user" />
                            <p style={{color: "red"}}></p>
                            <label><strong>Postal code *</strong></label>
                            <input type="text" name="postal_code" className="form-control form-control-user" />
                            <p style={{color: "red"}}></p>

                            <label><strong>City *</strong></label>
                            <input type="text" name="city_brand" className="form-control form-control-user" />
                            <p style={{color: "red"}}></p>

                            <label><strong>Country *</strong></label>
                            <input type="text" name="country_brand" className="form-control form-control-user" />
                            <p style={{color: "red"}}></p>
                        </div>
                    </div>
                    <div className="w-100 px-4 mb-5">
                        <button name="brand_save" className="btn btn-primary btn-user btn-block rounded-30 py-3">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default AddBrand