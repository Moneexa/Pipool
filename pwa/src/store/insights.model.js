import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';


const { action, thunk } = require("easy-peasy");
export const InsightsModel = {
    impressions: {},
    setImpressions: action((state, payload) => {
        state.impressions = payload;
        console.log(state.impressions)
    }),
    instaImpressionsInsights: thunk(async (actions, payload) => {
        const res = await axios.post(`${config.apiUrl}/channels/insights/instagram/`, payload)
        console.log(res.data)
        const impressions = []//res.data.data[0].values;
        const options = {
            title: {
                text: "Basic Column Chart in React"
            },
            style: {
                width: "100%"
            },
            axisX: {
                title: "Time Period",
            },
            axisY: {
                title: "Impressions",
            },
            data: [{
                type: "column",
                dataPoints: impressions
            }]
        }
        actions.setImpressions(options)
    }),
    instaFollowersInsights: thunk(async (actions, payload) => {
        const res = await axios.post(`${config.apiUrl}/channels/insights/instagram/`, payload)
        console.log(res.data)
        const impressions = res.data.data[3].values;
        const options = {
            title: {
                text: "Unique Followers insights"
            },
            style: {
                width: "100%"
            },
            axisX: {
                title: "Time Period",
            },
            axisY: {
                title: "Followers",
            },
            data: [{
                type: "column",
                dataPoints: impressions
            }]
        }
        actions.setImpressions(options)
    }),

    fbInsights: thunk(async (actions, payload) => {
        const res = await axios.post(`${config.apiUrl}/channels/insights/facebook/`, payload)
        console.log(res)
    })

};