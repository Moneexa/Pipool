import React from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { faFacebookF, faTwitter, faInstagram, faYoutube , faTiktok } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './ChannelManager.css'
import { useEffect } from 'react';
import { Link } from 'react-router-dom'

function Channel() {
    const channels = useStoreState(state => state.channels.channels);
    const listChannels = useStoreActions(actions => actions.channels.listChannels);

    useEffect(() => {
        listChannels();
    }, [listChannels])

    return (
        <div className="channel">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h2 className="m-0 font-weight-bold text-primary">Channel</h2>
            </div>
            <div className="row">
                {channels.map((value, index) =>
                    <div id="border" key={index} className="col-xl-4   col-lg-7">
                        <div className="card shadow mb-4">
                            <div className="card-body">
                                <img alt="" src="../img/users_profile.jpg" />
                                <h4>{value.channelName}</h4>
                                <p><b>Followers: {value.followers}</b></p>
                                <p style={{ marginBottom: "50px" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                <div className="text-center d-none d-md-inline">
                                    {
                                        value.channelType === "facebook" ?
                                            <Link to={`/influencer/channels/${value.channelId}/insights?ctype=${value.channelType}`}>

                                                <button className="btn btn-floating btn-lg btn-fb" type="button" >
                                                    <FontAwesomeIcon icon={faFacebookF} />
                                                </button></Link> : ''
                                    }
                                    {
                                        value.channelType === "twitter" ?
                                            <Link to={`/influencer/channels/${value.channelId}/insights?ctype=${value.channelType}`}>

                                                <button className="btn btn-floating btn-lg btn-tw" type="button">
                                                    <FontAwesomeIcon icon={faTwitter} />
                                                </button></Link> : ''
                                    }
                                    {
                                        value.channelType === "tiktok" ?
                                            <Link to={`/influencer/channels/${value.channelName}/insights?ctype=${value.channelType}`}>

                                                <button className="btn btn-floating btn-lg btn-tw" type="button">
                                                    <FontAwesomeIcon icon={faTiktok} />
                                                </button></Link> : ''
                                    }

                                    {
                                        value.channelType === "instagram" ?
                                            <Link to={`/influencer/channels/${value.channelId}/insights?ctype=${value.channelType}`}>
                                                <button className="btn btn-floating btn-lg btn-ins" type="button">
                                                    < FontAwesomeIcon icon={faInstagram} />
                                                </button></Link> : ''
                                    }
                                    {
                                        value.channelType === "youtube" ?
                                            <Link to={`/influencer/channels/${value.channelId}/insights?ctype=${value.channelType}`}>

                                                <button className="btn btn-floating btn-lg btn-ins" type="button">
                                                    < FontAwesomeIcon icon={faYoutube} />
                                                </button></Link> : ''
                                    }
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