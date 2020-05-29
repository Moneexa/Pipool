import React from 'react';
import { Link } from "react-router-dom";
import './Login.css';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export function Signup({ match }) {
    return (
        <div className="signin">
            <div className="bg-gradient-primary">
                <div className="container">

                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="p-5">
                                        <img src="/img/logo.jpg" />
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Create an Account!</h1>
                                        </div>
                                        <form className="user" method="post">
                                            <div className="form-group row">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="text" className="form-control form-control-user" id="exampleFirstName" name="First_Name" placeholder="First Name" value="" />
                                                    <p style={{ color: "red" }}> </p>
                                                </div>

                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control form-control-user" id="exampleLastName" name="Last_Name" placeholder="Last Name" value="" />
                                                    <p style={{ color: "red" }}> </p>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control form-control-user" id="exampleInputEmail" name="phone" placeholder="Telephone number(optional)" value="" />
                                            </div>

                                            <div className="form-group row">
                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control form-control-user" id="exampleLastName" name="company" placeholder="Company Name" value="" />
                                                    <p style={{ color: "red" }}> </p>
                                                </div>

                                                <div className="col-sm-6">
                                                    <input type="text" className="form-control form-control-user" id="exampleLastName" name="role" placeholder="Your role in company" value="" />
                                                    <p style={{ color: "red" }}> </p>
                                                </div>
                                            </div>


                                            <div className="form-group">
                                                <input type="email" className="form-control form-control-user" id="exampleInputEmail" name="email" placeholder="Email Address" value="" />
                                                <p style={{ color: "red" }}> </p>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-sm-6 mb-3 mb-sm-0">
                                                    <input type="password" className="form-control form-control-user" id="exampleInputPassword" name="password" placeholder="Password" value="" />
                                                    <p style={{ color: "red" }}></p>
                                                </div>
                                                <div className="col-sm-6">
                                                    <input type="password" className="form-control form-control-user" id="exampleRepeatPassword" name="confirm" placeholder="Repeat Password" value="" />
                                                    <p style={{ color: "red" }}> </p>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <select className="browser-default custom-select" name="admin_type">

                                                    <option value="1">I'm a Brand</option>
                                                    <option value="2">I'm a Influencer</option>
                                                </select>

                                            </div>
                                            <Link to="/dashboard/overview" className="btn btn-primary btn-user btn-block">Click to signup</Link>
                                            <hr />
                                            <Link to="/" className="btn btn-google btn-user btn-block">

                                                <FontAwesomeIcon icon={faGoogle} />
                                                 Register with Google
                                            </Link>
                                            <Link to="/" className="btn btn-facebook btn-user btn-block">

                                                <FontAwesomeIcon icon={faFacebook} />

                                            Register with Facebook
                                            </Link>
                                        </form>
                                        <hr />
                                        <div className="text-center">
                                            <Link className="small" to="/">Forgot Password?</Link>
                                        </div>
                                        <div className="text-center">
                                            <Link className="small" to="/auth/login">Already have an account? Login!</Link>
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
