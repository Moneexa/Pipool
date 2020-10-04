import React, { useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
import { Dropdown } from 'react-bootstrap';
import styles from './ActiveCampaign.module.css';

function ActiveCampaign() {
    const activeCampaigns = useStoreState(state => state.campaign.activeCampaigns);
    const influencersActiveCampaign = useStoreActions(actions => actions.campaign.influencersActiveCampaign);
    useEffect(() => {
        influencersActiveCampaign()
    }, [])
    return (
        <div className="campaigns-influence">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h2 className="m-0 font-weight-bold">Active Campaigns</h2>
            </div>
            <div className="row">
                {
                    activeCampaigns.map((value, index) => {
                        return (
                            < div id="border" className="col-xl-12 col-lg-12" key={index}>
                                <div className="card shadow mb-4 campaign-item">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="flex-grow-1">
                                                <h4 className="font-weight-bold">
                                                    <Link to={`/influencer/campaigns/${value.campaignId._id}`}>
                                                        {value.campaignId.serviceName}
                                                    </Link>
                                                </h4>
                                                <p className="text-secondary">
                                                    {value.campaignId.serviceDescription}
                                                </p>
                                            </div>
                                            <h1 className="text-success">
                                                ${value.price || 0}
                                            </h1>
                                            <Dropdown className={styles.menu}>
                                                <Dropdown.Toggle className={styles.menuButton} id="dropdown-basic"></Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item href="#/action-1">Report for dispute</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }

            </div>

        </div >
    )

}

export default ActiveCampaign;