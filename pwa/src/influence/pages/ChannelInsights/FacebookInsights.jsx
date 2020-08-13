import React, { useEffect } from 'react';
import config from '../../../config.json';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Pie, Bar, Line } from 'react-chartjs-2';


export function FacebookInsights({ channelId }) {
    const instaInsights = useStoreActions(actions => actions.insights.fbInsights)
    const cities = useStoreState(state => state.insights.fbCities)
    const countries = useStoreState(state => state.insights.fbCountries)
    const response = useStoreState(state => state.insights.fbResponse)

    const age = useStoreState(state => state.insights.fbAge)
    const insights = useStoreState(state => state.insights.facebook);
    const lastFetched = useStoreState(state => state.insights.lastFetched);
    function fetchInsights() {
        const host = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
        const oauthWindow = window.open(encodeURI(`${config.facebookPagesInsights.uri}/?redirect_uri=${host}${config.facebookPagesInsights.redirectURI}&client_id=${config.facebookPagesInsights.appId}&scope=${config.facebookPagesInsights.scope}&response_type=token&state={"{st=state123abc,ds=123456789}"}`));

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
    useEffect(() => { instaInsights({ channelId: channelId }) }, [])

    return (
        <div className="channel-insights">
            <div className="row d-flex justify-content-between">

                <button onClick={() => fetchInsights()} className="btn btn-primary rounded-30 text-white">Fetch Insights</button>
                <p className="col-md-6 float-right">{lastFetched}</p>
            </div>
            <div className="row">
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
                        }
                    }}
                />
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
                        }
                    }}
                />
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
                        }
                    }}
                />
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
                        }
                    }}
                />



            </div>

        </div>

    )
}