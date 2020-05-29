import React from 'react';
import { Link } from "react-router-dom";
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Login.css'
export function Login({ match }) {
    return (
        <div className="login">
            <div className="bg-gradient-primary">
                <div className="container">

                    <div className="row justify-content-center">

                        <div className="col-xl-10 col-lg-12 col-md-9">

                            <div className="card o-hidden border-0 shadow-lg my-5">
                                <div className="card-body p-0">
                                    <div className="row">
                                        <div className="col-lg-6" style={{
                                            background: "url(https://source.unsplash.com/K4mSJ7kc0As/600x800)",
                                            backgroundPosition: "center",
                                            backgroundSize: "cover"
                                        }}>

                                        </div>
                                        <div className="col-lg-6">
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                                </div>
                                                <div className="alert alert-success" role="alert">
                                                </div>

                                                <div className="alert alert-danger" role="alert">
                                                </div>
                                                <div className="alert alert-danger" role="alert">
                                                </div>

                                                <form className="user" method="post">
                                                    <div className="form-group">
                                                        <input type="email" name="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." value="" />
                                                        <p style={{ color: "red" }}> </p>
                                                    </div>

                                                    <div className="form-group">
                                                        <input type="password" name="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" value="" />
                                                        <p style={{ color: "red" }}> </p>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="custom-control custom-checkbox small">
                                                            <input type="checkbox" name="checkbox" className="custom-control-input" id="customCheck" checked />
                                                            <label className="custom-control-label" for="customCheck">Remember Me</label>
                                                        </div>
                                                    </div>
                                                    <Link to="/dashboard/overview" className="btn btn-primary btn-user btn-block">Login</Link>

                                                </form>
                                                <hr />
                                                <Link to="/" className="btn btn-google btn-user btn-block">
                                                    <FontAwesomeIcon icon={faGoogle} />
                                                    Login with Google
                                                </Link>
                                                <Link to="/" className="btn btn-facebook btn-user btn-block">
                                                    <FontAwesomeIcon icon={faFacebook} />
                                                Login with Facebook
                                                </Link>
                                                <hr />
                                                <div className="text-center">
                                                    <Link className="small" to="/">Forgot Password?</Link>
                                                </div>
                                                <div className="text-center">
                                                    <Link className="small" to="/auth/signup">Create an Account!</Link>
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
        </div>
    );
}
