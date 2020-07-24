import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useStoreActions } from 'easy-peasy';
import React, { useState } from 'react';
import config from '../../../config.json';
import { Modal } from 'react-bootstrap'
import { useForm } from "react-hook-form";

import { faTiktok } from '@fortawesome/free-brands-svg-icons'
import { useEffect } from 'react';

export function TiktokVerify() {
    // const loginFacebook = useStoreActions(actions => actions.user.loginFacebook);
    const authenticateTiktok = useStoreActions(actions => actions.channels.authenticateTiktok)
    const [pop, setPop] = useState(false)
    const { register, handleSubmit, watch, errors } = useForm()

    function openPopup() {

        //authenticateInsta();
        setPop(true);
    }
    function hideModal() {

        setPop(false);
    }
    useEffect(() => {

    }, []);
    function userSubmit(values) {
        console.log(values.userId)
        authenticateTiktok(values.userId)
    }

    return (
        <>
            <Modal show={pop} handleClose={hideModal}
                databackdrop="false"
                className="shadow-lg d-flex align-items-center"
                style={{
                    position: "absolute",

                }}

            >
                <Modal.Header>
                    <Modal.Title>
                        <h4> What is your tiktok id</h4>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label className="align-items-center justify-content-center">
                        Go to
                    <a href="https://www.tiktok.com/@mohsiniammar/video/6846362698410724610?u_code=dd9a4dabfj298g&preview_pb=0&language=en&_d=dd9a4el1139ak7&share_item_id=6846362698410724610&timestamp=1595134830&user_id=6846360634155697158&utm_source=messenger&utm_campaign=client_share&utm_medium=android&share_app_name=musically&share_iid=6849877026893170434&source=h5_m">
                            &nbsp;   Link 
                </a> and comment #LikeUs</label>
                    <form className="mt-3 mx-3 user" onSubmit={handleSubmit(userSubmit)}

                    >
                        <div className="form-group">

                            <br />
                            <input ref={register({ required: true })}
                                name="userId" type="text" className="form-control form-control-user"></input>
                            <br />

                            <div className="form-group row d-flex align-content-flex-end mr-auto mb-auto mt-3">
                                <button className="btn btn-user btn-block rounded-20 py-1 col-md-6" type="button" onClick={hideModal}>Cancel</button>

                                <button className="btn btn-primary btn-user btn-block rounded-20 py-1 col-md-6" type="submit">Save</button>


                            </div>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>
            <button type="button" databackdrop="false"
                onClick={() => openPopup()}
                className="btn btn-primary rounded-20 text-white">
                <FontAwesomeIcon icon={faTiktok} />
                &nbsp;Tiktok+
        </button>
        </>

    );
}