import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

export function Form2({ onNext, onPrevious }) {
    const { register, handleSubmit, errors } = useForm();
    const [dos, setDos] = useState([]);
    const [donts, setDonts] = useState([]);
    const [doVal, setDoVal] = useState('');
    const [dontVal, setDontVal] = useState('');
    function addDo() {
        setDos([...dos, doVal]);
        console.log(dos)
    }
    function addDont() {
        setDonts([...donts, dontVal]);
        console.log(dos)
    }
    return (
        <form className="row" onSubmit={handleSubmit((values) => {
            onNext(Object.assign({}, values, { dos, donts }))
        })}>
            <div className="col-12 col-lg-6 mb-3 mb-sm-0">

                <div>
                    <label className="call-for-action" >Call for action *</label>
                    <input
                        ref={register({ required: true })}
                        type="text"
                        name="callForAction"
                        className="simple-sentence-input form-control form-control-user"
                        placeholder="Describe in a simple sentence what you request from the influencers" />
                    {errors.callForAction && <span className="text-danger ml-3 form-error">This field is required</span>}
                </div>

                <div>
                    <label className="call-for-action">Brief the influencers *</label>
                    <textarea
                        ref={register({ required: true })}
                        name="briefInfluencers"
                        className="simple-sentence-input form-control form-control-user pt-3"
                        placeholder="Describe the content you'd like from our influencers. Try to be as clear as possible to avoid out of context content from the influencers"></textarea>
                    {errors.briefing && <span className="text-danger ml-3 form-error">This field is required</span>}
                </div>


                <div>
                    <label className="call-for-action">Do</label>
                    <div className="d-flex custom-postfix">
                        <input
                            value={doVal}
                            name="do"
                            type="text"
                            className="simple-sentence-input form-control form-control-user"
                            placeholder="Add a rule - press enter to confirm"
                            onChange={(e) => setDoVal(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addDo()
                                };
                            }}
                        />
                        <button type="button" className="btn btn-primary px-3 text-white" onClick={() => addDo()}>+</button>
                    </div>
                    {dos.map((value, index) => {
                        return (
                            <div key={index} className="pl-3 d-flex align-items-center">
                                <FontAwesomeIcon className="mr-2 text-success" icon={faCheckCircle} />{value}
                            </div>
                        )
                    })}
                </div>

                <div>
                    <label className="call-for-action">Don't </label>
                    <div className="d-flex custom-postfix">
                        <input
                            value={dontVal}
                            name="dont"
                            type="text"
                            className="simple-sentence-input form-control form-control-user"
                            placeholder="Add a rule - press enter to confirm"
                            onChange={(e) => setDontVal(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addDont()
                                };
                            }}
                        />
                        <button type="button" className="btn btn-primary px-3 text-white" onClick={() => addDont()}>+</button>
                    </div>
                    {donts.map((value, index) => {
                        return (
                            <div key={index} className="pl-3 d-flex align-items-center">
                                <FontAwesomeIcon className="mr-2 text-danger" icon={faTimesCircle} />{value}
                            </div>
                        )
                    })}
                </div>

                <div>
                    <label className="call-for-action" >Caption example (Optional)  </label>
                    <input
                        ref={register()}
                        name="caption"
                        type="text"
                        className="simple-sentence-input form-control form-control-user"
                        placeholder="Describe in a simple sentence what you request from the influencers" />
                    {errors.caption && <span className="text-danger ml-3 form-error">This field is required</span>}
                </div>
            </div>

            <div className="col-12 col-lg-6 mb-3 mb-sm-0">
                <div className="background-box need-product" id="bacground_box">
                    <p>Does the influencer need the product ?</p>
                    <label><input type="radio" 
                    
                    value="No, the influencers don’t need to physically have the product."
                    name="productNeed" ref={register({ required: true })} /> 
                    No, the influencers don’t need to physically have the product.
                     </label><br />
                    <label><input type="radio" value="Yes, the influencers and the product must appear on the post"
                    name="productNeed" ref={register({ required: true })} /> 
                    Yes, the influencers and the product must appear on the post </label><br />
                    <label><input type="radio" value="You will send the product sample to the influencers"
                    name="productNeed" ref={register({ required: true })} /> 
                     You will send the product sample to the influencers </label><br />
                    <label><input type="radio" value="The influencers will need to return the product (high value or prototype)"
                    name="productNeed" ref={register({ required: true })} />
                     The influencers will need to return the product (high value or prototype) </label>
                    <label><input type="radio" name="productNeed" value="The influencers should purchase or already own the product" 
                    ref={register({ required: true })} />  The influencers should purchase or already own the product  </label>
                    {errors.optradio && <span className="text-danger ml-3 form-error">This field is required</span>}
                </div>
                <div id="upload_btn" className="choose-file-form form-group row" >
                    <div className="choose-file-div form-group col-sm-4 mb-3 mb-sm-0">
                        <button className="btn btn-secondary rounded-20" type="button">Upload file here...</button>
                    </div>
                    <div className="choose-file-div form-group col-sm-4 mb-3 mb-sm-0">
                        <button className="btn btn-secondary rounded-20" type="button">Upload file here...</button>

                    </div>
                    <div className="choose-file-div form-group col-sm-4 mb-3 mb-sm-0">
                        <button className="btn btn-secondary rounded-20" type="button">Upload file here...</button>

                    </div>
                    <div className="choose-file-div form-group col-sm-4 mb-3 mb-sm-0">
                        <button className="btn btn-secondary rounded-20" type="button">Upload file here...</button>

                    </div>
                    <div className="choose-file-div form-group col-sm-4 mb-3 mb-sm-0">
                        <button className="btn btn-secondary rounded-20" type="button">Upload file here...</button>

                    </div>
                    <div className="choose-file-div form-group col-sm-4 mb-3 mb-sm-0">
                        <button className="btn btn-secondary rounded-20" type="button">Upload file here...</button>

                    </div>
                    <div className="choose-file-div form-group col-sm-4 mb-3 mb-sm-0">
                        <button className="btn btn-secondary rounded-20" type="button">Upload file here...</button>

                    </div>
                    <div className="choose-file-div form-group col-sm-4 mb-3 mb-sm-0">
                        <button className="btn btn-secondary rounded-20" type="button">Upload file here...</button>

                    </div>
                    <div className="choose-file-div form-group col-sm-4 mb-3 mb-sm-0">
                        <button className="btn btn-secondary rounded-20" type="button">Upload file here...</button>
                    </div>
                </div>
            </div>
            <div className="mt-5 d-flex justify-content-center align-items-center w-100">
                <button
                    onClick={() => onPrevious()}
                    type="button"
                    className="btn btn-secondary btn-user text-white next-button">
                    Previous
                </button>
                <button
                    type="submit"
                    className="btn btn-primary btn-user text-white next-button">
                    Next
                </button>
            </div>
        </form>
    )
}