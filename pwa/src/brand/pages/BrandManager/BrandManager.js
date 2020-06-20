import React from 'react';
import './BrandManager.css'
import axios from 'axios';
import config from '../../../config.json'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import AddBrand from '../AddBrand/AddBrand'

class BrandManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            brands: [],
        })
    }
    componentDidMount() {

        axios.get(`${config.apiUrl}/brands/`)
            .then((response) => {
                this.setState({
                    brands: response.data

                })
            })
            .catch(error => console.log(error))
    }

    render() {



        return (

            <div className="brand">

                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h2 className="m-0 font-weight-bold text-primary">Brands</h2>
                </div>
                {/* <div className="row">
                    <div id="border" className="col-xl-4 col-lg-7">
                        <div className="card shadow mb-4" style={{ background: "#ffc809" }}>
                            <div className="card-body">
                                <h2 style={{ fontSize: "90px", color: "#fff", textAlign: "center", fontWeight: "bold" }}>+</h2>
                                <h3 style={{ textAlign: "center", color: "#fff", fontWeight: "bold", fontSize: "37px" }}>Add a new brand</h3>
                            </div>
                        </div>
                    </div>
                    <div id="border" className="col-xl-4 col-lg-7">
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <img alt="" src={process.env.PUBLIC_URL + "/img/dog-647528__340.webp"} style={{ width: "100%" }} />
                            </div>
                        </div>
                    </div>
                    <div id="border" className="col-xl-4 col-lg-7">
                        <div   className="card shadow mb-4">
                            <div className="card-body">
                                <img alt="" src={process.env.PUBLIC_URL + "/img/dog-647528__340.webp"} style={{ width: "100%" }} />
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className="d-flex flex-wrap">
                    <div className="grid-item mr-5 bg-primary text-white rounded-5 d-flex flex-column justify-content-center align-items-center">
                        <div className="plus-icon" style={{ fontSize: "90px", color: "#fff", textAlign: "center", fontWeight: "bold" }}>+</div>
                        <div className="heading">Add a new brand</div>
                    </div>
                    <Router>

                        {this.state.brands.map((element, index, array) => {
                            // Return value for new_array

                            return (
                                <div key={index} className="grid-item mr-5 mb-3 p-3 bg-primary text-white rounded-5 d-flex flex-column justify-content-center align-items-center">
                                    <div className="grid-thumbnail w-100 h-100 rounded-5">
                                        <div className="overlay">
                                            <Link to={"/brand/add-brand/" + element._id}
                                                className="d-flex align-items-center justify-content-center">
                                                <FontAwesomeIcon
                                                    icon={faEdit} />
                                            </Link>
                                        </div>


                                    </div>
                                </div>
                            )
                        })
                        }
                        <Switch>
                            <Route path="/brand/add-brand/:id" component={AddBrand} />

                        </Switch>
                    </Router>

                </div>
            </div>

        )
    }
}

export default BrandManager