import React from 'react';
import { Link } from "react-router-dom";
import './FinishSignup.css';
import { faGoogle, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap'
import axios from 'axios'
import config from '../../config.json';

export class FinishSignup extends React.Component {
    constructor(props) {
        super(props);
        let params = new URLSearchParams(this.props.location.search);
        const token = params.get('token');
        const email = params.get('email');
        console.log(token);
        this.state = {
            name: '', lastname: '',
            password: '', password1: '',
            role: '',
            company: '', phone: '', companyrole: '',
            email: email || '',
            token: ''
        }
    }
    handleNameChange = (e) => {

        this.setState({
            name: e.target.value
        })
    }
    handleLastNameChange = (e) => {

        this.setState({
            lastname: e.target.value
        })
    }
    handlePhoneNumberChange = (e) => {
        this.setState({
            phone: e.target.value,
        })

    }
    handleCompanyRole = (e) => {
        this.setState({
            companyrole: e.target.value
        })

    }
    handleCompanyName = (e) => {

        this.setState({
            company: e.target.value
        })
    }
    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value,
        })

    }
    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })

    }
    handlePassword1Change = (e) => {
        this.setState({
            password1: e.target.value
        })

    }
    handleRoleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            role: e.target.value
        })
    }
    handleSubmit = (e) => {
        const obj = {
            name: this.state.name,
            password: this.state.password,
            email: this.state.email,
            role: this.state.role

        }
        axios.post(`${config.apiUrl}/auth/signup`, obj).then((response) => { console.log(response) }).catch(error => console.error(error.message));

    }

    render() {
        return (
            <div className="finish-signup signup-container">
                <div className="bg-gradient-primary py-5">
                    <div className="container">
                        <div className="card o-hidden border-0 shadow-lg">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="p-5">
                                            <img src="/img/logo.jpg" alt="" />
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Complete your Registeration</h1>
                                            </div>
                                            <form className="user" method="post">
                                                <div className="form-group row">
                                                    <div className="col-sm-6 mb-3 mb-sm-0">
                                                        <input

                                                            onChange={this.handleNameChange}
                                                            type="text" className="py-4 pl-3 form-control form-control-user"
                                                            id="exampleFirstName" name="First_Name" placeholder="First Name"
                                                            value={this.state.name} />
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <input
                                                            onChange={this.handleLastNameChange}

                                                            type="text" className="py-4 pl-3 form-control form-control-user"
                                                            id="exampleLastName" name="Last_Name" placeholder="Last Name"
                                                            value={this.state.lastname} />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <input
                                                        onChange={this.handlePhoneNumberChange}

                                                        type="text" className="py-4 pl-3 form-control form-control-user"
                                                        id="examplePhoneNumber" name="phone" placeholder="Telephone number(optional)"
                                                        value={this.state.phone} />
                                                </div>

                                                <div className="form-group row">
                                                    <div className="col-sm-6">
                                                        <input

                                                            onChange={this.handleCompanyName}

                                                            type="text" className="py-4 pl-3 form-control form-control-user"
                                                            id="exampleCompanyName" name="company" placeholder="Company Name"
                                                            value={this.state.company} />
                                                    </div>

                                                    <div className="col-sm-6">
                                                        <input
                                                            onChange={this.handleCompanyRole}

                                                            type="text" className="py-4 pl-3 form-control form-control-user"
                                                            id="exampleCompanyRole" name="role" placeholder="Your role in company"
                                                            value={this.state.companyrole} />
                                                    </div>
                                                </div>


                                                <div className="form-group">
                                                    <input
                                                        disabled
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
                                                <div className="form-group">
                                                    <select

                                                        onChange={this.handleRoleChange}

                                                        className="py-4 pl-3 browser-default custom-select" name="admin_type"
                                                        value={this.state.role}
                                                    >
                                                        <option value="1">I'm a Brand</option>
                                                        <option value="2">I'm a Influencer</option>
                                                    </select>

                                                </div>
                                                <Button

                                                    onClick={this.handleSubmit}
                                                    className="btn btn-user btn-block text-white">
                                                    Register Account
                                                </Button>
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
}
