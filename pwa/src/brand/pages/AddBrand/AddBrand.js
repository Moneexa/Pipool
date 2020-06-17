import React from 'react'
import './AddBrand.css'
import axios from 'axios'
import config from '../../../config.json'
import { useForm } from "react-hook-form";
import { matchPath } from 'react-router'

import {
    BrowserRouter as Router, useParams} from "react-router-dom";
export default function AddBrand(props) {
    const match = matchPath(props.history.location.pathname, {
        path: '/brand/add-brand/:id',
        exact:  false,
        strict: false
      })

    let  id  = match.params.id;
    console.log(id)
    var arr = {}
    if (id) {
        axios.get(`${config.apiUrl}/brands/${id}`)
            .then((response) => {
                arr = response.data
            })
            .catch(error => console.log(error))
    }
    else {
        arr = {
            name: "",
            description: "",
            website: "",
            skype: "",
            PhoneNo: "",
            contactName: "",
            City: "",
            Country: "",
            PostalCode: "",
            hashTags: "",
            Address: "",
        }

    }


    const { register, handleSubmit, watch, errors } = useForm({
        defaultValues: {
            name: arr.name,
            desc: arr.description,
            website: arr.website,
            skype: arr.skype,
            phoneNo: arr.PhoneNo,
            contactName: arr.contactName,
            city: arr.City,
            country: arr.Country,
            postalCode: arr.PostalCode,
            hashTags: arr.hashTags,
            address: arr.Address,
        }
    })
    const updateBrand = (values) => {
        if (id) {
            axios.put(`${config.apiUrl}/brands/${id}`, values)
                .then((response) => { console.log(response) })
                .catch(error => console.error(error.message));
        }
        else {
            axios.post(`${config.apiUrl}/brands/`, values)
                .then((response) => { console.log(response) })
                .catch(error => console.error(error.message));
        }
    }


return (

    <div className="add-brand">
        <div className="text-center">
            <h1 className="h4 text-gray-900 mb-4">Add a New Brand</h1>
        </div>
        <form className="row" method="post"

            encType="multipart/form-data" onSubmit={handleSubmit(updateBrand)}>

            <div className="form-group col-xs-12 col-lg-3">
                <label htmlFor="basic-url">
                    <strong>Upload your logo *</strong>
                </label>
                <div className="input-group mb-3">
                    <div className="custom-file">
                        <input
                            ref={register({ required: false })}
                            name="logo"
                            type="file" className="custom-file-input" id="inputGroupFile01" />
                        <label
                            className="custom-file-label" htmlFor="inputGroupFile01" >
                        </label>


                    </div>
                </div>
            </div>
            <div className="form-group col-xs-12 col-lg-9 mb-3 mb-sm-0">
                <label><strong>Brand name *</strong></label>

                <input ref={register({ required: true })}

                    type="text" name="name" className="form-control form-control-user"
                    id="exampleInputEmail" placeholder="Enter the name of your brand"
                />
                <p style={{ color: "red" }}></p>

                <label><strong>Tell us about your brand *</strong></label>

                <textarea
                    ref={register({ required: true })}

                    className="form-control form-control-user"
                    name="desc"
                    id=""
                    placeholder="This description should help influencers understand more about you brand, try to be as clear as possible.">

                </textarea>
                <p style={{ color: "red" }}></p>

                <label><strong>Website</strong></label>
                <input
                    ref={register({ required: true })}

                    type="text"
                    name="website" className="form-control form-control-user"
                    placeholder="http://" />
                <p style={{ color: "red" }}></p>

                <label><strong>Skype (optional)</strong></label>
                <input ref={register({ required: true })}

                    type="text"
                    name="skype"
                    className="form-control form-control-user"
                    placeholder="Enter your skype name or e-mail address" />

                <label><strong>Contact name *</strong></label>
                <input ref={register({ required: true })}

                    type="text" name="contactName"
                    className="form-control form-control-user"
                    placeholder="First and last name of the contact" />
                <p style={{ color: "red" }}></p>

                <label><strong>Hashtags *</strong></label>
                <input ref={register({ required: true })}

                    type="text" name="hashTags"
                    className="form-control form-control-user"
                    placeholder="Hashtags" />
                <label><strong>Phone number *</strong></label>
                <input

                    ref={register({ required: true })}
                    type="text" name="phoneNo"
                    className="form-control form-control-user"
                    placeholder="Enter a phone number" />
                <p style={{ color: "red" }}></p>

                <label><strong>Address *</strong></label>
                <input
                    ref={register({ required: true })}

                    type="text" name="address"
                    className="form-control form-control-user" />
                <p style={{ color: "red" }}></p>
                <label><strong>Postal code *</strong></label>
                <input ref={register({ required: true })}

                    type="text" name="postalCode" className="form-control form-control-user" />
                <p style={{ color: "red" }}></p>

                <label><strong>City *</strong></label>
                <input ref={register({ required: true })}

                    type="text" name="city"
                    className="form-control form-control-user" />
                <p style={{ color: "red" }}></p>

                <label><strong>Country *</strong></label>
                <input ref={register({ required: true })}

                    type="text" name="country"
                    className="form-control form-control-user" />
                <p style={{ color: "red" }}></p>
            </div>
            <div className="w-100 px-4 mb-5">
                <button type="submit"
                    name="brand_save" className="btn btn-primary btn-user btn-block rounded-30 py-3">Save</button>

            </div>

        </form>
    </div >
)
}
