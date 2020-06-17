import { useStoreActions, useStoreState } from 'easy-peasy';
import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FacebookLoginWrapper } from '../shared/components/FacebookLoginWrapper';
import { GoogleLoginWrapper } from '../shared/components/GoogleLoginWrapper';
import { LinkedInWrapper } from '../shared/components/LinkedinWrapper';
import './Login.css';



export function Login() {
    const { register, handleSubmit, watch, errors } = useForm();
    const [signingup, setSigningup] = useState(false);
    const signup = useStoreActions(actions => actions.user.signup);
    const login = useStoreActions(actions => actions.user.login);
    const loading = useStoreState(state => state.user.loading);
    const loginErrorMessage = useStoreState(state => state.user.errors.loginErrorMessage);
    function onSubmit(values) {
        if (signingup) {
            signup(values.email);
        } else {
            login(values);
        }
    }

    return (
        <div className="login">
            <div className="bg-gradient-primary d-flex justify-content-center align-items-center">
                <div className="container">

                    <div className="row justify-content-center">

                        <div className="col-xl-10 col-lg-12 col-md-9">

                            <div className="card o-hidden border-0 shadow-lg my-5 overflow-hidden rounded-5">
                                <div className="card-body p-0">
                                    <div className="row mx-0">
                                        <div className="col-lg-6" style={{
                                            background: "url(https://source.unsplash.com/K4mSJ7kc0As/600x800)",
                                            backgroundPosition: "center",
                                            backgroundSize: "cover"
                                        }}>

                                        </div>
                                        <div className="col-lg-6 p-0">
                                            {
                                                !loading?'':
                                                <div className="loading-overlay d-flex justify-content-center align-items-center">
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                </div>
                                            }
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-4">{signingup ? 'Create an Account' : 'Welcome Back!'} </h1>
                                                </div>
                                                {
                                                    loginErrorMessage?
                                                    <div class="alert alert-danger" role="alert">
                                                        {loginErrorMessage}
                                                    </div>
                                                    :''
                                                }
                                                <form className="user" onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="form-group">
                                                        <input
                                                            ref={register({
                                                                required: true,
                                                                pattern: {
                                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                                    message: "invalid email address"
                                                                }
                                                            })}
                                                            type="email"
                                                            name="email"
                                                            className="py-4 form-control form-control-user"
                                                            aria-describedby="emailHelp"
                                                            placeholder="Enter Email Address..." />
                                                        <p className="form-error px-3 text-danger h6">{errors.email && errors.email.message}</p>
                                                    </div>

                                                    {
                                                        signingup ? '' :
                                                            <div>
                                                                <div className="form-group">
                                                                    <input 
                                                                    required
                                                                    ref={register}
                                                                    type="password" name="password" 
                                                                    className="py-4 form-control form-control-user" 
                                                                    placeholder="Password" />
                                                                    {errors.password && <span className="form-error px-3 text-danger h6">This field is required</span>}
                                                                </div>
                                                                <div className="form-group remember-me">
                                                                    <div className="custom-control custom-checkbox small d-flex align-items-center">
                                                                        <input type="checkbox" name="checkbox" className="py-4 custom-control-input" id="customCheck" />
                                                                        <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    }

                                                    <button type="submit" to="/brand" className="btn btn-user btn-block text-white no-focus-effects">
                                                        {signingup ? 'Register Account' : 'Login'}
                                                    </button>

                                                </form>
                                                <hr />
                                                <GoogleLoginWrapper />
                                                <FacebookLoginWrapper />
                                                <LinkedInWrapper />

                                                <hr />

                                                {
                                                    !signingup ?
                                                        <div className="text-center">
                                                            <Link className="small text-dark-blue" to="/">Forgot Password?</Link>
                                                        </div> :
                                                        ''
                                                }

                                                {
                                                    !signingup ?
                                                        <Link className="text-center">
                                                            <div className="small text-dark-blue" onClick={() => setSigningup(true)}>Create an Account!</div>
                                                        </Link> :
                                                        <Link className="text-center" >
                                                            <div className="small text-dark-blue" onClick={() => setSigningup(false)}>Already have an account? Login!</div>
                                                        </Link>
                                                }
                                            </div>
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
