import React from 'react';
import { Link } from "react-router-dom";
import './Signup.css';
import { faGoogle, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap'
import axios from 'axios'
import config from '../../config.json';

export class SimpleSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '', password1: '',

        }
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value,
            name: this.state.name,
            password: this.state.password,
            password1: this.state.password1,

            role: this.state.role
        })

    }
    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value,
            name: this.state.name,
            email: this.state.email,
            password1: this.state.password1,

            role: this.state.role
        })

    }
    handlePassword1Change = (e) => {
        this.setState({
            password1: e.target.value,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,

            role: this.state.role
        })

    }

    handleSubmit = (e) => {


        const obj = {
            password: this.state.password,
            email: this.state.email,

        }
        //  axios.post(`${config.apiUrl}/auth/signup`,  obj ).then((response) => { console.log(response) }).catch(error => console.error(error.message));

    }

    render() {
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
                                                <h1 className="h4 text-gray-900 mb-4">Register your email</h1>
                                            </div>
                                            <form className="user" method="post">
                                                <div className="form-group">
                                                    <input
                                                        onChange={this.handleEmailChange}
                                                        type="email" className="py-4 pl-3 form-control form-control-user"
                                                        id="exampleEmailChange" name="email" placeholder="Email Address"
                                                        value={this.state.email} />
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                                        <input type="password" className="py-4 pl-3 form-control form-control-user"
                                                            onChange={this.handlePassword1Change}
                                                            id="exampleInputPassword" name="password" placeholder="Password"
                                                            value={this.state.password1} />
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <input
                                                            onChange={this.handlePasswordChange}
                                                            type="password" className="py-4 pl-3 form-control form-control-user"
                                                            id="exampleRepeatPassword" name="confirm" placeholder="Repeat Password"
                                                            value={this.state.password} />
                                                    </div>
                                                </div>
                                                <Button
                                                    onClick={this.handleSubmit}
                                                    className="btn btn-user btn-block text-white">
                                                    Verify Email
                                                </Button>
                                                <hr />
                                            </form>
                                            <hr />
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
}
