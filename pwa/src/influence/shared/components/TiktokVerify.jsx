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
    //    document.getElementById("p1").style.display="flex"
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
                <form className="mt-3 mx-3" onSubmit={handleSubmit(userSubmit)}

                >
                    <label ><h4> What is your tiktok id</h4></label>
                    <br />
                    <input ref={register({ required: true })}

                        name="userId" type="text"></input>
                    <br />
                    <div className="form-group row d-flex mr-auto mb-auto mt-3"
                        style={{ justifyContent: "flex-end" }}
                    >
                        <button className="my-2" type="button" onClick={hideModal}>Cancel</button>

                        <button className="my-2" type="submit">Save</button>
                    </div>
                </form>
                <p className="align-items-center justify-content-center" 
                id="p1"
                style={{
                    display:"none",
                }}
                >Go to Link and comment</p>
            </Modal>
            <button type="button" dataBackdrop="false"
                onClick={() => openPopup()}
                className="btn btn-primary rounded-20 text-white">
                <FontAwesomeIcon icon={faTiktok} />
                + Tiktok Account
        </button>
        </>

    );
}