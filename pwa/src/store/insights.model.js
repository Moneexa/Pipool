import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';


const { action, thunk } = require("easy-peasy");
export const InsightsModel = {
    instagram: [],
    facebook: [],
    youtubeViews: [], youtubeSubscribers: [], youtubeEstTime:[],
    setInstagram: action((state, payload) => {
        state.instagram = payload;
    }),
    setFacebook: action((state, payload) => {
        state.facebook = payload;
    }),
    setYoutubeViews: action((state, payload) => {
        state.youtubeViews = payload;
    }),
    setYoutubeSubscribers: action((state, payload) => {
        state.youtubeSubscribers = payload;
    }),
    setYoutubeEstTime: action((state, payload) => {
        state.youtubeEstTime = payload;
    }),
    instaInsights: thunk(async (actions, payload) => {
        const insights = []
        const res = await axios.post(`${config.apiUrl}/channels/insights/instagram/`, payload)
        console.log(res.data)
        for (let insight of res.data.data) {
            insights.push({
                animationEnabled: true,
                theme: "light2",
                axisX: {
                    title: "Time Period",
                },
                axisY: {
                    title: insight.title,
                },
                data: [{
                    type: "column",
                    dataPoints: insight.values.map((data => {
                        return { y: data.value, label: data.end_time.substring(0, 10) }
                    }))
                }]
            });
        }
        console.log(insights);
        // const impressions = res.data.data[0].values;
        // const followers = res.data.data[3].values;
        // const impressionsOptions = {
        //     animationEnabled: true,
        //     theme: "light2",
        //     title: {
        //         text: "Unique Business Impressions"
        //     },

        //     axisX: {
        //         title: "Time Period",
        //     },
        //     axisY: {
        //         title: "Impressions",
        //     },
        //     data: impressions
        // }
        actions.setInstagram(insights);
    }),

    fbInsights: thunk(async (actions, payload) => {
        const insights = []
        const res = await axios.post(`${config.apiUrl}/channels/insights/facebook/`, payload)
        console.log(res.data)
        for (let insight of res.data.data) {
            insights.push({
                animationEnabled: true,
                theme: "light2",
                axisX: {
                    title: "Time Period",
                },
                axisY: {
                    title: insight.title,
                },
                data: [{
                    type: "column",
                    dataPoints: insight.values.map((data => {
                        return { y: data.value, label: data.end_time.substring(0, 10) }
                    }))
                }]
            });
        }
        actions.setFacebook(insights);
    }),
    youtubeInsights: thunk(async (actions, payload) => {
        const viewinsights = [], estTime = [], subscribersGained=[];
        const res = await axios.post(`${config.apiUrl}/channels/insights/youtube`, payload)
        console.log(res.data.columnHeaders)
        const viewdataPoints = [], estTimedataPoints = [], subsdataPoints=[];
        for (let insight of res.data.rows) {
            viewdataPoints.push({ date: insight[0], views: insight[1] });
            subsdataPoints.push({ date: insight[0], subs: insight[3] });
            estTimedataPoints.push({ date: insight[0], est: insight[2] });


        }

        viewinsights.push({
            animationEnabled: true,
            theme: "light2",
            axisX: {
                title: "Time Period",
            },
            axisY: {
                title: "Views",
            },
            data: [{
                type: "column",
                dataPoints: viewdataPoints.map((data, index) => {
                    console.log(data)
                    return { y: index, label: data.date, x: data.views }
                })
            }]
        });
        estTime.push({
            animationEnabled: true,
            theme: "light2",
            axisX: {
                title: "Time Period",
            },
            axisY: {
                title: "Estimated Minutes Watched",
            },
            data: [{
                type: "column",
                dataPoints: estTimedataPoints.map((data, index) => {
                    console.log(data)
                    return { y: index, label: data.date, x: data.est }
                })
            }]
        });
       subscribersGained.push({
            animationEnabled: true,
            theme: "light2",
            axisX: {
                title: "Time Period",
            },
            axisY: {
                title: "Subscribers Gained",
            },
            data: [{
                type: "column",
                dataPoints: subsdataPoints.map((data, index) => {
                    console.log(data)
                    return { y: index, label: data.date, x: data.subs }
                })
            }]
        });
        
        actions.setYoutubeViews(viewinsights);
        actions.setYoutubeEstTime(estTime);
        actions.setYoutubeSubscribers(subscribersGained);

    })

};