import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStoreActions, useStoreState } from 'easy-peasy';
import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import './BrandManager.css';


export default function BrandManager() {
    const listBrands = useStoreActions(actions => actions.brand.listBrands);
    const list = useStoreState(state => state.brand.list);


    useEffect(() => {
        listBrands();
    }, [listBrands]);

    console.log(list);
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

                    {list.map((element, index, array) => {
                        // Return value for new_array
                          
                        return (
                            <div key={index} className="grid-item mr-5 mb-3 p-3 bg-primary text-white rounded-5 d-flex flex-column justify-content-center align-items-center">
                                <div className="grid-thumbnail w-100 h-100 rounded-5">
                                    <div className="overlay d-flex align-items-center justify-content-center">
                                        <Link to={"/brand/edit/" + element._id}
                                            className="icon">
                                            <FontAwesomeIcon

                                                className="m-2"


                                                icon={faEdit} />

                                        </Link>
                                    </div>


                                </div>
                            </div>
                        )
                    })
                    }

                </div>
            </div>

        )
    }
