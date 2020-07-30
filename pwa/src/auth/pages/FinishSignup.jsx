import { useStoreActions, useStoreState } from 'easy-peasy';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import './FinishSignup.css';


export function FinishSignup({ location }) {
    let params = new URLSearchParams(location.search);
    const token = params.get('token');
    const email = params.get('email');
    const finishSignup = useStoreActions(actions => actions.user.finishSignup);
    const loading = useStoreState(state => state.user.loading);
    const finishSignupMessage = useStoreState(state => state.user.errors.finishSignupMessage);
    const { register, handleSubmit, watch, errors } = useForm();

    const updateUser = (values) => {
        finishSignup({
            body: values,
            token: token
        });
    }
    if (!email || !token) {
        return <Redirect to="/" />
    }
    return (
        <div className="finish-signup signup-container">
            <div className="bg-gradient-primary py-5">
                <div className="container">
                    <div className="card o-hidden border-0 shadow-lg">
                        <div className="card-body p-0">
                            {
                                !loading ? '' :
                                    <div className="loading-overlay d-flex justify-content-center align-items-center">
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    </div>
                            }
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="p-5">
                                        <img src="/img/logo.jpg" alt="" />
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Complete your Registeration</h1>
                                        </div>
                                        {
                                            finishSignupMessage?
                                            <div class="alert alert-danger" role="alert">
                                                {finishSignupMessage}
                                            </div>
                                            :''
                                        }
                                        
                                        <form className="user" method="post" onSubmit={handleSubmit(updateUser)}>
                                            <div className="form-group row">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input
                                                        ref={register({ required: true })}
                                                        type="text"
                                                        className="py-4 pl-3 form-control form-control-user"
                                                        name="firstName"
                                                        placeholder="First Name" />
                                                    {errors.firstName && <span className="text-danger ml-3">This field is required</span>}
                                                </div>

                                                <div className="col-sm-6">
                                                    <input
                                                        ref={register({ required: true })}
                                                        type="text" className="py-4 pl-3 form-control form-control-user"
                                                        name="lastName"
                                                        placeholder="Last Name" />
                                                    {errors.lastName && <span className="text-danger ml-3">This field is required</span>}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    ref={register({ required: true })}
                                                    type="text"
                                                    className="py-4 pl-3 form-control form-control-user"
                                                    name="phone"
                                                    placeholder="Telephone number(optional)" />
                                                {errors.phone && <span className="text-danger ml-3">This field is required</span>}
                                            </div>

                                            <div className="form-group row">
                                                <div className="col-sm-6">
                                                    <input
                                                        ref={register({ required: true })}
                                                        type="text"
                                                        className="py-4 pl-3 form-control form-control-user"
                                                        name="company"
                                                        placeholder="Company Name" />
                                                    {errors.company && <span className="text-danger ml-3">This field is required</span>}
                                                </div>

                                                <div className="col-sm-6">
                                                    <input
                                                        ref={register({ required: true })}
                                                        type="text"
                                                        className="py-4 pl-3 form-control form-control-user"
                                                        name="designation"
                                                        placeholder="Your role in company" />
                                                    {errors.designation && <span className="text-danger ml-3">This field is required</span>}
                                                </div>
                                            </div>


                                            <div className="form-group">
                                                <input
                                                    disabled
                                                    type="email" className="py-4 pl-3 form-control form-control-user"
                                                    name="email"
                                                    placeholder="Email Address"
                                                    value={email} />
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input
                                                        ref={register({
                                                            required: true,
                                                            pattern: {
                                                                value: /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i,
                                                                message: "Make sure to enter a valid password(min 8 characters, 1 uppercase,1 lowercase,1 digit or special case letter.)"
                                                            }
                                                        })}
                                                        type="password"
                                                        className="py-4 pl-3 form-control form-control-user"
                                                        name="password"
                                                        placeholder="Password" />
                                                    <span className="px-3 text-danger">{errors.password && errors.password.message}</span>
                                                </div>
                                                <div className="col-sm-6">
                                                    <input
                                                        ref={register({
                                                            validate: (value) => {
                                                                return value === watch('password'); // value is from password2 and watch will return value from password1
                                                            }
                                                        })}
                                                        type="password"
                                                        className="py-4 pl-3 form-control form-control-user"
                                                        name="repeatedPassword"
                                                        placeholder="Repeat Password" />
                                                    {errors.repeatedPassword && <span className="text-danger ml-3">Passwords do not match</span>}
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <select
                                                    ref={register({ required: true })}
                                                    className="pad-12 h-auto pl-3 browser-default custom-select"
                                                    name="role">

                                                    <option value="brand">I'm a Brand</option>
                                                    <option value="influencer">I'm a Influencer</option>
                                                </select>
                                                {errors.role && <span className="text-danger ml-3">This field is required</span>}

                                            </div>
                                            <Button
                                                type="submit"
                                                className="btn btn-user btn-block text-white">
                                                Register Account
                                                </Button>
                                        </form>
                                        <hr />
                                        <div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
