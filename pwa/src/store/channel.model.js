import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';


const { action, thunk } = require("easy-peasy");
export const ChannelModel = {
    channels: [],
    loading: false,
    setChannels: action((state, payload) => {
        state.channels = payload;
    }),
    add: action((state, payload) => {
        state.channels.push(payload)
    }),
    toggleLoading: action((state, payload) => {
        state.loading = payload
    }),
    
    listChannels: thunk(async (actions, payload) => {
        const { data } = await axios.get(`${config.apiUrl}/influencers/channels`)
        console.log(data)
        actions.setChannels(data);
    }),

    authenticateTwitter: thunk(async (actions, payload, helpers) => {
        try {
            const res = await axios.post(`${config.apiUrl}/influencers/channels/twitter/oauth/request_token`);

            const oauthWindow = window.open(encodeURI(`https://api.twitter.com/oauth/authenticate?oauth_token=${res.data.oauth_token}`));
            var timer = setInterval(async () => {
                try {
                    if (oauthWindow.closed) {
                        clearInterval(timer);
                        const redirectUrl = new URL(localStorage.getItem('oAuthRedirectUrl', window.location.href));
                        const searchParams = redirectUrl.searchParams;
                        const token = searchParams.get('oauth_token');
                        const verifier = searchParams.get('oauth_verifier');

                        console.log(token, verifier);
                        const body = {
                            oauth_token: token,
                            verifier: verifier,
                            category: payload.category
                        }
                        actions.toggleLoading(true);
                        const res = await axios.post(`${config.apiUrl}/influencers/channels/twitter/oauth/`, body);
                        actions.toggleLoading(false);

                        actions.add(res.data);
                        toastr.success("Successfully Twitter Channel")

                    }
                } catch (error) {
                    actions.toggleLoading(false);

                    if (error.response && error.response.data)
                        toastr.error(error.response.data);
                    else
                        toastr.error(error.message);
                }

            }, 1000);
        } catch (error) {
            if (error.response && error.response.data)
                toastr.error(error.response.data);
            else
                toastr.error(error.message);
        }

    }),
    authInsta: thunk(async (actions, payload) => {

        try {
            actions.toggleLoading(true);

            const res = await axios.post(`${config.apiUrl}/influencers/channels/instagram/oauth`, payload)
            actions.toggleLoading(false);

            console.log(res)
            toastr.success('Successfully added channel')
        }
        catch (error) {
            actions.toggleLoading(false);


            toastr.error(error.response.status === 405 ? 'Account already exists' : 'Error while adding the channel')
        }
    }),
    authenticateTiktok: thunk(async (actions, payload) => {
        try {


            actions.toggleLoading(true);

            const response = await axios.post(`${config.apiUrl}/influencers/channels/tiktok/oauth`, payload)
            actions.toggleLoading(false);

            console.log(response)
            toastr.success('Successfully added channel')
        }
        catch (error) {
            actions.toggleLoading(false);


            console.log(error)
            toastr.error(error.response.status === 405 ? 'Account already exists' : 'Error while adding the channel')
        }

    }),
    authFacebook: thunk(async (actions, payload) => {

        try {
            actions.toggleLoading(true);

            const res = await axios.post(`${config.apiUrl}/influencers/channels/facebook/oauth`, payload)
            actions.toggleLoading(false);

            console.log(res)
            toastr.success('Successfully added channel')
        }
        catch (error) {
            actions.toggleLoading(false);


            console.log(error)
            toastr.error(error.response.status === 405 ? 'Account already exists' : 'Error while adding the channel')
        }
    }),

    saveYoutube: thunk(async (actions, payload) => {
        try {
            actions.toggleLoading(true);

            await axios.post(`${config.apiUrl}/influencers/channels/youtube/oauth/`, payload);
            actions.toggleLoading(false);

            toastr.success('Successfully added YouTube Channel')
        } catch (error) {
            actions.toggleLoading(false);

            toastr.error("Something went wrong when adding the YouTube Channel")
        }
    }),
    
};