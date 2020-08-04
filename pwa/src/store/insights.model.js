import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';


const { action, thunk } = require("easy-peasy");
export const InsightsModel = {
    instagram: [],
    facebook: [],
    youtube : [],
    setInstagram: action((state, payload) => {
        state.instagram = payload;
    }),
    setFacebook: action((state, payload) => {
        state.facebook = payload;
    }),
    setYoutube: action((state,payload)=>{
        state.youtube=payload;
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
        const insights=[];
        const res = await axios.post(`${config.apiUrl}/channels/insights/youtube`, payload)
        console.log(res);
    })

};