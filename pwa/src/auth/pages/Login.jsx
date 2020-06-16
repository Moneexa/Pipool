import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { faGoogle, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap'
import { FacebookLoginWrapper } from '../shared/components/FacebookLoginWrapper';
import { GoogleLoginWrapper } from '../shared/components/GoogleLoginWrapper';
import './Login.css'
import { LinkedInWrapper } from '../shared/components/LinkedinWrapper';
import axios from 'axios'
import config from '../../config.json';
import { useStoreActions } from 'easy-peasy';



export function Login() {
    const [signingup, setSigningup] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const signup = useStoreActions(actions => actions.user.signup);
    function onSubmit() {
        if (signingup) {
            signup(email)
        } else {

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
                                        <div className="col-lg-6">
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-4">{signingup ? 'Create an Account' : 'Welcome Back!'} </h1>
                                                </div>
                                                <form className="user" method="post">
                                                    <div className="form-group">
                                                        <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" name="email" className="py-4 form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                                                        <p style={{ color: "red" }}> </p>
                                                    </div>

                                                    {
                                                        signingup ? '' :
                                                            <div>
                                                                <div className="form-group">
                                                                    <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" name="password" className="py-4 form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                                                                    <p style={{ color: "red" }}> </p>
                                                                </div>
                                                                <div className="form-group remember-me">
                                                                    <div className="custom-control custom-checkbox small d-flex align-items-center">
                                                                        <input type="checkbox" name="checkbox" className="py-4 custom-control-input" id="customCheck" />
                                                                        <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    }

                                                    <button type="button" onClick={() => onSubmit()} to="/brand" className="btn btn-user btn-block text-white no-focus-effects">
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
                                                        <Link className="text-center" to="/auth/finish-signup"> 
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
