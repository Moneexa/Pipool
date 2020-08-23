import React, { useEffect } from 'react';
import config from '../../../config.json';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Spinner } from 'react-bootstrap';


export function InstagramInsights({ channelId }) {
    const instaInsights = useStoreActions(actions => actions.insights.instaInsights)
    const cities = useStoreState(state => state.insights.instagramCities)
    const countries = useStoreState(state => state.insights.instagramCountries)
    const response = useStoreState(state => state.insights.instagramResponse)
    const loading = useStoreState(state => state.insights.loading);

    const age = useStoreState(state => state.insights.instagramAge)
    const insights = useStoreState(state => state.insights.instagram);
    const lastFetched = useStoreState(state => state.insights.lastFetched);
    function fetchInsights() {
        ;
        const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
        const oauthWindow = window.open(encodeURI(`${config.instagramInsights.uri}/?redirect_uri=${host}${config.instagramInsights.redirectURI}&client_id=${config.instagramInsights.appId}&scope=${config.instagramInsights.scope}&response_type=token&state={"{st=state123abc,ds=123456789}"}`));

        var timer = setInterval(function () {
            if (oauthWindow.closed) {
                clearInterval(timer);
                const redirectUrl = new URL(localStorage.getItem('oAuthRedirectUrl').replace('?#', '?'));
                const searchParams = redirectUrl.searchParams;
                console.log(searchParams);

                const code = searchParams.get('access_token');
                console.log(code)
                instaInsights({ token: code, channelId: channelId })
            }
        }, 1000);


    }
    useEffect(() => { instaInsights({ channelId: channelId }) }, [instaInsights, channelId])
    return (
        <div className="channel-insights">
            <div className="col-md-12">
                {
                    !loading ? '' :
                        <div className="loading-overlay d-flex justify-content-center align-items-center" style={{
                            position: "absolute",
                            width: "100%",
                            height: "100vh",
                            backgroundColor: "rgba(0, 0, 0, 0.3)",
                            zIndex: "1"

                        }}>
                            <Spinner size="bg" animation="border" variant="success" />
                        </div>
                }
            </div>
            <div className="row d-flex justify-content-between">
                <button onClick={() => fetchInsights()} className="btn btn-primary rounded-30 text-white ml-2">Fetch Insights</button>
                <p className="col-md-6 float-right">{lastFetched}</p>
            </div>
            <div className="row">
                <div className="col-md-6">

                    <Pie
                        data={insights}
                        options={{
                            title: {
                                display: true,
                                text: 'Gender distribution',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'left'
                            }
                        }}
                    />
                </div>
                <div className="col-md-6">

                    <Bar
                        data={age}
                        options={{
                            title: {
                                display: true,
                                text: 'Age distribution',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'bottom'
                            },
                            scales: {
                                xAxes: [{
                                    gridLines: {
                                        display: false
                                    }
                                }],
                                yAxes: [{
                                    gridLines: {
                                        display: false
                                    }
                                }]
                            }
                        }}
                    />
                </div>
                <div className="col-md-6">

                    <Bar
                        data={cities}
                        options={{
                            title: {
                                display: true,
                                text: 'City distribution',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'bottom'
                            },
                            scales: {
                                xAxes: [{
                                    gridLines: {
                                        display: false
                                    }
                                }],
                                yAxes: [{
                                    gridLines: {
                                        display: false
                                    }
                                }]
                            }
                        }}
                    />
                </div>
                <div className="col-md-6">

                    <Bar
                        data={countries}
                        options={{
                            title: {
                                display: true,
                                text: 'Countries distribution',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'bottom'
                            },
                            scales: {
                                xAxes: [{
                                    gridLines: {
                                        display: false
                                    }
                                }],
                                yAxes: [{
                                    gridLines: {
                                        display: false
                                    }
                                }]
                            }
                        }}
                    />
                </div>
                <div className="col-md-6">

                    <Line
                        data={response}
                        options={{
                            title: {
                                display: true,
                                text: 'Estimated Response',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            },
                            scales: {
                                xAxes: [{
                                    gridLines: {
                                        display: false
                                    }
                                }],
                                yAxes: [{
                                    gridLines: {
                                        display: false
                                    }
                                }]
                            }
                        }}
                    />

                </div>


            </div>

        </div>

    )
}