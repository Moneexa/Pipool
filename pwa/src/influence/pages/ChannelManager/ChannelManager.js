import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ChannelManager.css'
import { useEffect } from 'react';
function Channel() {
    const channels = useStoreState(state => state.channels.channels);
    const listChannels = useStoreActions(actions => actions.channels.listChannels)
    useEffect(() => {
        listChannels();
    }, [])

    return (

        <div className="channel">


            <div className="d-sm-flex align-items-center justify-content-between mb-4">

                <h2 className="m-0 font-weight-bold text-primary">Channel</h2>
            </div>

            <div className="row">
                {channels.map((value, index) => 
                    <div id="border" className="col-xl-4   col-lg-7">

                        <div className="card shadow mb-4">
                            <div className="card-body">

                                <img alt="" src="../img/users_profile.jpg" />
                                <h4>{value.channelName}</h4>
                                <p><b>Project Manager</b></p>
                                <p style={{ marginBottom: "50px" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                <div className="text-center d-none d-md-inline">
                                    <button className="btn btn-floating btn-lg btn-fb" type="button">
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </button>
                                    <button className="btn btn-floating btn-lg btn-tw" type="button">
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </button>
                                    <button className="btn btn-floating btn-lg btn-li" type="button">
                                        <FontAwesomeIcon icon={faLinkedinIn} />
                                    </button>
                                    <button className="btn btn-floating btn-lg btn-ins" type="button">
                                        < FontAwesomeIcon icon={faInstagram} />
                                    </button>
                                </div>

                            </div>

                        </div>

                    </div>
                )}


            </div>
        </div>



    )
}

export default Channel