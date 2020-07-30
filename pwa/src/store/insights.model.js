import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';


const { action, thunk } = require("easy-peasy");
export const InsightsModel = {
    impressions: {},
    InstaFollowers: {},
    setImpressions: action((state, payload) => {
        state.impressions = payload;
        console.log(state.impressions)
    }),
    setInstaFollowers: action((state, payload) => {
        state.InstaFollowers = payload;
        console.log(state.instaFollowers)
    }),
    instaInsights: thunk(async (actions, payload) => {
        const res = await axios.post(`${config.apiUrl}/channels/insights/instagram/`, payload)
        console.log(res.data.data[0].values)
        const impressions = res.data.data[0].values;
        const followers = res.data.data[3].values;
        const impressionsOptions = {
            animationEnabled: true,
			theme: "light2",
            title: {
                text: "Unique Business Impressions"
            },

            axisX: {
                title: "Time Period",
            },
            axisY: {
                title: "Impressions",
            },
            data: impressions
        }
        actions.setImpressions(impressionsOptions)

        const followersOptions = {
            animationEnabled: true,
			theme: "light2",
            title: {
                text: "Unique Followers insights"
            },

            axisX: {
                title: "Time Period",
            },
            axisY: {
                title: "Followers",
            },
            data: [{
                type: "column",
                dataPoints: followers
            }]
        }
        actions.setInstaFollowers(followersOptions)
    }),

    fbInsights: thunk(async (actions, payload) => {
        const res = await axios.post(`${config.apiUrl}/channels/insights/facebook/`, payload)
        console.log(res)
    })

};