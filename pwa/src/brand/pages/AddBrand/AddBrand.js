import React from 'react'
import './AddBrand.css'
import axios from 'axios'
import config from '../../../config.json'
import { useForm } from "react-hook-form";
import { matchPath } from 'react-router';
import { BrowserRouter as Router, useParams } from "react-router-dom";
import { useStoreActions, useStoreState } from 'easy-peasy';
export default function AddBrand({ match }) {
    const active = useStoreState(state => state.brand.active);

    //const [updateRequired, setUpdateRequired] = useState(false);
    const { register, handleSubmit, watch, errors } = useForm()

    const put = useStoreActions(actions => actions.brand.put);
    const post = useStoreActions(actions => actions.brand.post);
    const obj = useStoreActions(actions => actions.brand.getId);
    let id;
    if (match) {
        id = match.params.id;
    }
    console.log(id)


    /*var arr = {
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
    }*/
    if (id) {
        obj(id)



    }

    function updateBrand(values) {
        if (id) {
            values.id = id;

            put(values)

        }
        else {
            post(values)
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
                        defaultValue={active.name}
                        type="text" name="name" className="form-control form-control-user"
                        id="exampleInputEmail" placeholder="Enter the name of your brand"
                    />
                    <p style={{ color: "red" }}></p>

                    <label><strong>Tell us about your brand *</strong></label>

                    <textarea
                        ref={register({ required: true })}
                        defaultValue={active.desc}
                        className="form-control form-control-user"
                        name="desc"
                        id=""
                        placeholder="This description should help influencers understand more about you brand, try to be as clear as possible.">

                    </textarea>
                    <p style={{ color: "red" }}></p>


                    <label><strong>Website</strong></label>
                    <input
                        ref={register({ required: true })}
                        defaultValue={active.website}
                        type="text"
                        name="website" className="form-control form-control-user"
                        placeholder="http://" />
                    <p style={{ color: "red" }}></p>

                    <label><strong>Skype (optional)</strong></label>
                    <input ref={register({ required: true })}
                        defaultValue={active.skype}
                        type="text"
                        name="skype"
                        className="form-control form-control-user"
                        placeholder="Enter your skype name or e-mail address" />

                    <label><strong>Contact name *</strong></label>
                    <input ref={register({ required: true })}

                        type="text" name="contactName"
                        defaultValue={active.contactName}
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
                        defaultValue={active.phoneNo}
                        type="text" name="phoneNo"
                        className="form-control form-control-user"
                        placeholder="Enter a phone number" />
                    <p style={{ color: "red" }}></p>

                    <label><strong>Address *</strong></label>
                    <input
                        ref={register({ required: true })}
                        defaultValue={active.address}
                        type="text" name="address"
                        className="form-control form-control-user" />
                    <p style={{ color: "red" }}></p>
                    <label><strong>Postal code *</strong></label>
                    <input ref={register({ required: true })}
                        defaultValue={active.postalCode}
                        type="text" name="postalCode" className="form-control form-control-user" />
                    <p style={{ color: "red" }}></p>

                    <label><strong>City *</strong></label>
                    <input ref={register({ required: true })}
                        defaultValue={active.city}
                        type="text" name="city"
                        className="form-control form-control-user" />
                    <p style={{ color: "red" }}></p>

                    <label><strong>Country *</strong></label>
                    <input ref={register({ required: true })}
                        defaultValue={active.country}
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
