import React from 'react'
import { styles } from './AddBrand.css'
import './AddBrand.css'
import axios from 'axios'
import config from '../../../config.json'


class AddBrand extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            name: '',
            logo: '',
            contactName: '',
            skype: '',
            description: '',
            website: '',
            hashTags: '',
            PhoneNo: '',
            Address: '',
            PostalCode: '',
            City: '',
            Country: '',
            success: false

        })
    }
    componentDidMount(props) {
        this.setState({
            name: '',
            logo: 'Choose a file',
            contactName: '',
            skype: '',
            description: '',
            website: '',
            hashTags: '',
            PhoneNo: '',
            Address: '',
            PostalCode: '',
            City: '',
            Country: '',
            success: false

        })
    }
    handleNameChange = (e) => {
        const name = e.target.value;
        this.setState({
            name: name,
            logo: this.state.logo,
            skype: this.state.skype,
            contactName: this.state.contactName,
            description: this.state.description,
            website: this.state.website,
            hashTags: this.state.hashTags,
            PhoneNo: this.state.PhoneNo,
            Address: this.state.Address,
            PostalCode: this.state.PostalCode,
            City: this.state.City,
            Country: this.state.Country
        })
    }
    handleLogoChange = (e) => {
        const logo = e.target.files[0].name;
        this.setState({
            name: this.state.name,
            logo: logo,
            contactName: this.state.contactName,
            skype: this.state.skype,

            description: this.state.description,
            website: this.state.website,
            hashTags: this.state.hashTags,
            PhoneNo: this.state.PhoneNo,
            Address: this.state.Address,
            PostalCode: this.state.PostalCode,
            City: this.state.City,
            Country: this.state.Country
        })

    }
    handleContactNameChange = (e) => {
        const contactName = e.target.value
        this.setState({
            name: this.state.name,
            logo: this.state.logo,
            contactName: contactName,
            skype: this.state.skype,

            description: this.state.description,
            website: this.state.website,
            hashTags: this.state.hashTags,
            PhoneNo: this.state.PhoneNo,
            Address: this.state.Address,
            PostalCode: this.state.PostalCode,
            City: this.state.City,
            Country: this.state.Country
        })
    }
    handleDescriptionChange = (e) => {
        const desc = e.target.value
        this.setState({
            name: this.state.name,
            logo: this.state.logo,
            contactName: this.state.contactName,
            skype: this.state.skype,

            description: desc,
            website: this.state.website,
            hashTags: this.state.hashTags,
            PhoneNo: this.state.PhoneNo,
            Address: this.state.Address,
            PostalCode: this.state.PostalCode,
            City: this.state.City,
            Country: this.state.Country
        })
    }
    handleWebsiteChange = (e) => {
        const website = e.target.value
        this.setState({
            name: this.state.name,
            logo: this.state.logo,
            contactName: this.state.contactName,
            skype: this.state.skype,

            description: this.state.description,
            website: website,
            hashTags: this.state.hashTags,
            PhoneNo: this.state.PhoneNo,
            Address: this.state.Address,
            PostalCode: this.state.PostalCode,
            City: this.state.City,
            Country: this.state.Country
        })
    }
    handleHashTagsChange = (e) => {
        const hashtags = e.target.value
        this.setState({
            name: this.state.name,
            logo: this.state.logo,
            contactName: this.state.contactName,
            skype: this.state.skype,

            description: this.state.description,
            website: this.state.website,
            hashTags: hashtags,
            PhoneNo: this.state.PhoneNo,
            Address: this.state.Address,
            PostalCode: this.state.PostalCode,
            City: this.state.City,
            Country: this.state.Country
        })
    }
    handlePhoneNoChange = (e) => {
        const phoneNo = e.target.value
        this.setState({
            name: this.state.name,
            logo: this.state.logo,
            contactName: this.state.contactName,
            skype: this.state.skype,

            description: this.state.description,
            website: this.state.website,
            hashTags: this.state.hashTags,
            PhoneNo: phoneNo,
            Address: this.state.Address,
            PostalCode: this.state.PostalCode,
            City: this.state.City,
            Country: this.state.Country
        })
    }
    handleAddressChange = (e) => {
        const address = e.target.value
        this.setState({
            name: this.state.name,
            logo: this.state.logo,
            contactName: this.state.contactName,
            skype: this.state.skype,

            description: this.state.description,
            website: this.state.website,
            hashTags: this.state.hashTags,
            PhoneNo: this.state.PhoneNo,
            Address: address,
            PostalCode: this.state.PostalCode,
            City: this.state.City,
            Country: this.state.Country
        })
    }
    handlePostalCodeChange = (e) => {
        const postalCode = e.target.value
        this.setState({
            name: this.state.name,
            logo: this.state.logo,
            contactName: this.state.contactName,
            skype: this.state.skype,

            description: this.state.description,
            website: this.state.website,
            hashTags: this.state.hashTags,
            PhoneNo: this.state.PhoneNo,
            Address: this.state.Address,
            PostalCode: postalCode,
            City: this.state.City,
            Country: this.state.Country
        })
    }
    handleCityChange = (e) => {
        const city = e.target.value
        this.setState({
            name: this.state.name,
            logo: this.state.logo,
            contactName: this.state.contactName,
            skype: this.state.skype,

            description: this.state.description,
            website: this.state.website,
            hashTags: this.state.hashTags,
            PhoneNo: this.state.PhoneNo,
            Address: this.state.Address,
            PostalCode: this.state.PostalCode,
            City: city,
            Country: this.state.Country
        })
    }
    handleCountryChange = (e) => {
        const country = e.target.value
        this.setState({
            name: this.state.name,
            logo: this.state.logo,
            contactName: this.state.contactName,
            skype: this.state.skype,

            description: this.state.description,
            website: this.state.website,
            hashTags: this.state.hashTags,
            PhoneNo: this.state.PhoneNo,
            Address: this.state.Address,
            PostalCode: this.state.PostalCode,
            City: this.state.City,
            Country: country
        })
    }
    handleSkypeChange = (e) => {
        const skype = e.target.value
        this.setState({
            name: this.state.name,
            logo: this.state.logo,
            contactName: this.state.contactName,
            skype: skype,

            description: this.state.description,
            website: this.state.website,
            hashTags: this.state.hashTags,
            PhoneNo: this.state.PhoneNo,
            Address: this.state.Address,
            PostalCode: this.state.PostalCode,
            City: this.state.City,
            Country: this.state.Country
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const obj = {
            name: this.state.name,
            logo: this.state.logo,
            contactName: this.state.contactName,
            skype: this.state.skype,
            description: this.state.description,
            website: this.state.website,
            hashTags: this.state.hashTags,
            PhoneNo: this.state.PhoneNo,
            Address: this.state.Address,
            PostalCode: this.state.PostalCode,
            City: this.state.City,
            Country: this.state.Country
        }


        axios.post(`${config.apiUrl}/brands/`, obj)
            .then((resp) => {
                if (resp) {
                    this.setState({ success: true })
                }
                console.log(resp)
            })
            .catch(error => {
                this.setState({ success: false })
                console.log(error)
            })


    }


    render() {

        return (

            <div className="add-brand">
                <div className="text-center">
                    <h1 className="h4 text-gray-900 mb-4">Add a New Brand</h1>
                </div>
                <form className="row" method="post"

                    encType="multipart/form-data" onSubmit={this.handleSubmit}>

                    <div className="form-group col-xs-12 col-lg-3">
                        <label htmlFor="basic-url">
                            <strong>Upload your logo *</strong>
                        </label>
                        <div className="input-group mb-3">
                            <div className="custom-file">
                                <input
                                    onChange={this.handleLogoChange}
                                    type="file" className="custom-file-input" id="inputGroupFile01" />
                                <label
                                    className="custom-file-label" htmlFor="inputGroupFile01" >
                                    {this.state.logo} </label>


                            </div>
                        </div>
                    </div>
                    <div className="form-group col-xs-12 col-lg-9 mb-3 mb-sm-0">
                        <label><strong>Brand name *</strong></label>

                        <input onChange={this.handleNameChange}
                            type="text" name="brand_nm" className="form-control form-control-user"
                            id="exampleInputEmail" placeholder="Enter the name of your brand"
                            value={this.state.name} />
                        <p style={{ color: "red" }}></p>

                        <label><strong>Tell us about your brand *</strong></label>

                        <textarea onChange={this.handleDescriptionChange}

                            className="form-control form-control-user"
                            name="brand_desc"
                            value={this.state.description}
                            id=""
                            placeholder="This description should help influencers understand more about you brand, try to be as clear as possible.">

                        </textarea>
                        <p style={{ color: "red" }}></p>

                        <label><strong>Website</strong></label>
                        <input onChange={this.handleWebsiteChange}
                            type="text" value={this.state.website}
                            name="website_url" className="form-control form-control-user"
                            placeholder="http://" />
                        <p style={{ color: "red" }}></p>

                        <label><strong>Skype (optional)</strong></label>
                        <input onChange={this.handleSkypeChange}

                            type="text" value={this.state.skype}
                            name="skype_id"
                            className="form-control form-control-user"
                            placeholder="Enter your skype name or e-mail address" />

                        <label><strong>Contact name *</strong></label>
                        <input onChange={this.handleContactNameChange}
                            type="text" name="contact_nm" value={this.state.contactName}
                            className="form-control form-control-user"
                            placeholder="First and last name of the contact" />
                        <p style={{ color: "red" }}></p>

                        <label><strong>Hashtags *</strong></label>
                        <input onChange={this.handleHashTagsChange}
                            type="text" name="contact_nm"
                            className="form-control form-control-user"
                            placeholder="Hashtags" value={this.state.hashTags} />
                        <label><strong>Phone number *</strong></label>
                        <input
                            onChange={this.handlePhoneNoChange}
                            type="text" name="contact_no" value={this.state.PhoneNo}
                            className="form-control form-control-user"
                            placeholder="Enter a phone number" />
                        <p style={{ color: "red" }}></p>

                        <label><strong>Address *</strong></label>
                        <input onChange={this.handleAddressChange}
                            type="text" name="address" value={this.state.address}
                            className="form-control form-control-user" />
                        <p style={{ color: "red" }}></p>
                        <label><strong>Postal code *</strong></label>
                        <input onChange={this.handlePostalCodeChange}
                            value={this.state.PostalCode}
                            type="text" name="postal_code" className="form-control form-control-user" />
                        <p style={{ color: "red" }}></p>

                        <label><strong>City *</strong></label>
                        <input onChange={this.handleCityChange}
                            type="text" name="city_brand" value={this.state.City}
                            className="form-control form-control-user" />
                        <p style={{ color: "red" }}></p>

                        <label><strong>Country *</strong></label>
                        <input onChange={this.handleCountryChange}
                            type="text" name="country_brand" value={this.state.Country}
                            className="form-control form-control-user" />
                        <p style={{ color: "red" }}></p>
                    </div>
                    <div className="w-100 px-4 mb-5">
                        <button onClick={this.handleSubmit}
                            name="brand_save" className="btn btn-primary btn-user btn-block rounded-30 py-3">Save</button>
                     {this.state.success ?
                        <p style={{ color: "grey" }}> Brand Created Successfully </p>
                        : <p style={{ color: "grey" }}> </p>

                    }
                    
                    </div>
                   
                </form>
            </div >
        )
    }
}
export default AddBrand