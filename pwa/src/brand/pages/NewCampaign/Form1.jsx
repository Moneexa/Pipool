import React from 'react';
import { useForm } from "react-hook-form";

export function Form1({ onNext }) {
    const { register, handleSubmit, watch, errors } = useForm()
    return (
        <form className="row" onSubmit={handleSubmit((values) => {
            onNext(values)
        })}>
            <div className="col-12 col-lg-6 mb-3 mb-sm-0">
                <div>
                    <label className="first-form-labels">Product or service name *</label>
                    <input
                        ref={register({ required: true })}
                        type="text"
                        className="form-control form-control-user first-form"
                        name="serviceName"
                        placeholder="Enter the name of your product or service"
                    />
                    {errors.serviceName && <span className="text-danger ml-3 form-error">This field is required</span>}
                </div>

                <div>
                    <label className="first-form-labels">Product or service description *</label>
                    <textarea
                        ref={register({ required: true })}
                        className="form-control form-control-user first-form pt-3"
                        rows="10"
                        name="description"
                        placeholder="Describe your product or service as if your audience is new to it. On the next steps, you'll be able to describe the content you'd like from our influencers. ">
                    </textarea>
                    {errors.description && <span className="text-danger ml-3 form-error">This field is required</span>}
                </div>

                <div>
                    <label className="first-form-labels">Category *</label>
                    <select ref={register({ required: true })} className="browser-default custom-select" id="category" name="category">
                        <option disabled>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    {errors.category && <span className="text-danger ml-3 form-error">This field is required</span>}
                </div>
            </div>

            <div className="col-12 col-lg-6 mb-3 mb-sm-0">
                <label htmlFor="basic-url">
                    <strong>Set your campaign Cover Image *</strong>
                </label>
                <div className="input-group mb-3">
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="inputGroupFile01" />
                        <label className="custom-file-label" htmlFor="inputGroupFile01">Choose a file</label>
                    </div>
                </div>
                <div id="bac_img" className="bac-image">
                    <img alt="" src="../img/logo-ip.png" className={{ borderRadius: "80px", padding: "10px" }} />
                </div>
            </div>
            <div className="mt-5 d-flex justify-content-center align-items-center w-100">
                <button
                    type="submit"
                    className="btn btn-primary btn-user text-white next-button">
                    Next
                </button>
            </div>
        </form>
    )
}