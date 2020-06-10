import React from 'react';
import { Link } from "react-router-dom";
import { faGoogle, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleLogin } from 'react-google-login';
import ReactDOM from 'react-dom';
import { Button } from 'react-bootstrap'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import './Login.css'
import { LinkedIn } from '../shared/components/Linkedin';
import axios from 'axios'
import config from '../../config.json';



export class Login extends React.Component {
    state = {
        code: '',
        errorMessage: '',
        tokenId: '', email: '', password: '', imgSrc: '', name: ''
    };


    handleSuccess = (data) => {
        this.setState({
            code: data.code,
            errorMessage: '',
        },
            console.log(data)
        );

    }

    handleFailure = (error) => {
        this.setState({
            code: '',
            errorMessage: error.errorMessage,
        },
            console.log(error)
        );
    }
    responseGoogle = (googleUser) => {
        const code = googleUser.getAuthResponse().id_token;


        axios.post(`${config.apiUrl}/auth/login/google`,
            { code })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(() => alert("Unable to login"))
    }
    responseFacebook = (response) => {
        const code = response.accessToken;
        axios.get(`${config.apiUrl}/auth/login/facebook`, { code })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
            .catch(console.error);



    }
    render() {
        const { code, errorMessage } = this.state;

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
                                                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                                    </div>
                                                    <form className="user" method="post">
                                                        <div className="form-group">
                                                            <input type="email" name="email" className="py-4 form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                                                            <p style={{ color: "red" }}> </p>
                                                        </div>

                                                        <div className="form-group">
                                                            <input type="password" name="password" className="py-4 form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                                                            <p style={{ color: "red" }}> </p>
                                                        </div>
                                                        <div className="form-group remember-me">
                                                            <div className="custom-control custom-checkbox small d-flex align-items-center">
                                                                <input type="checkbox" name="checkbox" className="py-4 custom-control-input" id="customCheck" />
                                                                <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                                                            </div>
                                                        </div>
                                                        <Link to="/brand" className="btn btn-user btn-block text-white no-focus-effects">Login</Link>

                                                    </form>
                                                    <hr />
                                                    <GoogleLogin
                                                        clientId={config.google.clientId}
                                                        render={renderProps => (
                                                            <Button
                                                                onClick={renderProps.onClick} disabled={renderProps.disabled}

                                                                className="btn btn-google btn-user btn-block no-focus-effects d-flex justify-content-center align-items-center">
                                                                <FontAwesomeIcon className="social-icon" icon={faGoogle} />
                                                                    Login with Google
                                                            </Button>
                                                        )}
                                                        onSuccess={this.responseGoogle}
                                                        onFailure={this.responseGoogle}
                                                        cookiePolicy={'single_host_origin'}
                                                    />

                                                    <FacebookLogin
                                                        appId="263197894950161"
                                                        callback={this.responseFacebook}
                                                        render={renderProps => (
                                                            <Button

                                                                onClick={renderProps.onClick}
                                                                className="btn btn-facebook btn-user btn-block no-focus-effects d-flex justify-content-center align-items-center">
                                                                <FontAwesomeIcon className="social-icon" icon={faFacebook} />
                                                    Login with Facebook
                                                            </Button>
                                                        )}
                                                    />
                                                    <LinkedIn />
                                                    {/* <LinkedIn
                                                        clientId="865ntwzmhauy0w"
                                                        onFailure={this.handleFailure}
                                                        onSuccess={
                                                             function(data) {
                                                                console.log(data)
                                                                this.setState({
                                                                    code: data.code,
                                                                    errorMessage: '',
                                                                },
                                                                );
                                                        
                                                            }
                                                        }
                                                        scope="r_liteprofile"
                                                        redirectUri="http://localhost:3000/auth/login"
                                                        renderElement={({ onClick, disabled }) => (
                                                            <Button
                                                                onClick={onClick} disabled={disabled}
                                                                className="btn btn-linkedin btn-block no-focus-effects d-flex justify-content-center align-items-center">
                                                                <FontAwesomeIcon className="social-icon" icon={faLinkedin} />
                                                    Login with LinkedIn
                                                            </Button>
                                                        )}
                                                    /> */}
                                                    {!code && <div>No code</div>}
                                                    {code && <div>Code: {code}</div>}
                                                    {errorMessage && <div>{errorMessage}</div>}

                                                    <hr />
                                                    <div className="text-center">
                                                        <Link className="small text-dark-blue" to="/">Forgot Password?</Link>
                                                    </div>
                                                    <div className="text-center">
                                                        <Link className="small text-dark-blue" to="/auth/signup">Create an Account!</Link>
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
}
