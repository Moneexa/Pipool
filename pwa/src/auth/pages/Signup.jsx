import React from 'react';
import { Link } from "react-router-dom";
import './Signup.css';
import { faGoogle, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export function Signup({ match }) {
    return (
        <div className="signup singup-container">
            <div className="bg-gradient-primary py-5">
                <div className="container">
                    <div className="card o-hidden border-0 shadow-lg">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="p-5">
                                        <img src="/img/logo.jpg" alt="" />
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                        </div>
                                        <form className="user" method="post">
                                            <div className="form-group row">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="text" className="py-4 pl-3 form-control form-control-user" id="exampleFirstName" name="First_Name" placeholder="First Name" value="" />
                                                </div>

                                                <div className="col-sm-6">
                                                    <input type="text" className="py-4 pl-3 form-control form-control-user" id="exampleLastName" name="Last_Name" placeholder="Last Name" value="" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="py-4 pl-3 form-control form-control-user" id="exampleInputEmail" name="phone" placeholder="Telephone number(optional)" value="" />
                                            </div>

                                            <div className="form-group row">
                                                <div className="col-sm-6">
                                                    <input type="text" className="py-4 pl-3 form-control form-control-user" id="exampleLastName" name="company" placeholder="Company Name" value="" />
                                                </div>

                                                <div className="col-sm-6">
                                                    <input type="text" className="py-4 pl-3 form-control form-control-user" id="exampleLastName" name="role" placeholder="Your role in company" value="" />
                                                </div>
                                            </div>


                                            <div className="form-group">
                                                <input type="email" className="py-4 pl-3 form-control form-control-user" id="exampleInputEmail" name="email" placeholder="Email Address" value="" />
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="password" className="py-4 pl-3 form-control form-control-user" id="exampleInputPassword" name="password" placeholder="Password" value="" />
                                                </div>
                                                <div className="col-sm-6">
                                                    <input type="password" className="py-4 pl-3 form-control form-control-user" id="exampleRepeatPassword" name="confirm" placeholder="Repeat Password" value="" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <select className="py-4 pl-3 browser-default custom-select" name="admin_type">
                                                    <option value="1">I'm a Brand</option>
                                                    <option value="2">I'm a Influencer</option>
                                                </select>

                                            </div>
                                            <Link to="/dashboard/overview" className="btn btn-user btn-block text-white">Register Account</Link>
                                            <hr />
                                            <Link to="/" className="btn btn-google btn-block">
                                                <FontAwesomeIcon className="social-icon" icon={faGoogle} />
                                                 Register with Google
                                            </Link>
                                            <Link to="/" className="btn btn-facebook btn-block">
                                                <FontAwesomeIcon className="social-icon" icon={faFacebook} />
                                                Register with Facebook
                                            </Link>
                                            <Link to="/" className="btn btn-linkedin btn-block no-focus-effects d-flex justify-content-center align-items-center">
                                                <FontAwesomeIcon className="social-icon" icon={faLinkedin} />
                                                Login with LinkedIn
                                            </Link>
                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <Link className="small text-dark-blue" to="/">Forgot Password?</Link>
                                        </div>
                                        <div className="text-center">
                                            <Link className="small text-dark-blue" to="/auth/login">Already have an account? Login!</Link>
                                        </div>
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
