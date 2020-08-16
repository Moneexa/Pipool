import React, { useEffect } from 'react';
import config from '../../../config.json';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Pie, Bar, Line } from 'react-chartjs-2';

var gapi = window.gapi;
var GoogleAuth = window.GoogleAuth;
export function YoutubeInsights({ channelId }) {

    var SCOPE = 'https://www.googleapis.com/auth/youtube.readonly';
    var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';

    const youtube_Insights = useStoreActions(actions => actions.insights.youtubeInsights);
    const age = useStoreState(state => state.insights.youtubeAge)
    const insights = useStoreState(state => state.insights.youtubeGender);
    const lastFetched = useStoreState(state => state.insights.lastFetched);
    const cities = useStoreState(state => state.insights.fbCities)
    const countries = useStoreState(state => state.insights.fbCountries)
    const response = useStoreState(state => state.insights.fbResponse)

    useEffect(() => {
        gapi.load('client:auth2', initClient);
        youtube_Insights({ channelId: channelId })
    }, []);
    async function fetchInsights() {
        const user = await GoogleAuth.signIn();
        gapi.client.setApiKey(config.google.apiKey);
        const channels = await gapi.client.youtube.channels.list({
            mine: true,
            part: 'id,statistics,snippet'
        });

        console.log(user.getAuthResponse().access_token)
        youtube_Insights({ token: user.getAuthResponse().access_token, channelId: channelId })
    }
    function initClient() {
        gapi.client.init({
            'apiKey': config.google.apiKey,
            'clientId': config.google.clientId,
            'discoveryDocs': [discoveryUrl],
            'scope': SCOPE
        }).then(function () {
            GoogleAuth = gapi.auth2.getAuthInstance();
        });
    }


    return (
        <div className="channel-insights">
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