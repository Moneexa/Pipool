import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';

const { action, thunk } = require("easy-peasy");
let campaign = {
    id: "",
    serviceName: "",
    serviceDescription: "",
    category: "",
    coverImage: "",
    callForAction: "",
    briefInfluencers: "",
    do: [],
    dont: [],
    caption: "",
    productNeed: "",
    gender: "",
    location: "",
    age: "",
    minFollowers: "",
    postingLanguages: "",
    interests: [],

};
export const InfluencersCampaignsModel = {
    loading: false,
    campaignList: [],
    activeCampaigns: [],
    actv: {
        id: campaign.id,
        serviceName: campaign.serviceName,
        serviceDescription: campaign.serviceDescription,
        category: campaign.category,
        coverImage: campaign.coverImage,
        callForAction: campaign.callForAction,
        briefInfluencers: campaign.briefInfluencers,
        do: campaign.do,
        dont: campaign.dont,
        caption: campaign.caption,
        productNeed: campaign.productNeed,
        gender: campaign.gender,
        location: campaign.location,
        age: campaign.age,
        minFollowers: campaign.minFollowers,
        postingLanguages: campaign.postingLanguages,
        interests: campaign.interests,
    },
    errors: {
        postErrorMessage: "",
    },
    updateCampaignList: action((state, payload) => {
        state.campaignList = payload;
    }),
    updateActiveCampaigns: action((state, payload) => {
        state.activeCampaigns = payload;
    }),
    updateLoading: action((state, payload) => {
        state.loading = payload
    }),
    updateCampaign: action((state, payload) => {
        state.actv.id = payload._id || state.actv.id;
        state.actv.serviceName = payload.serviceName || state.actv.serviceName;
        state.actv.serviceDescription = payload.serviceDescription || state.actv.serviceDescription;
        state.actv.category = payload.category || state.actv.category;
        state.actv.coverImage = payload.coverImage || state.actv.coverImage;
        state.actv.callForAction = payload.callForAction || state.actv.callForAction;
        state.actv.briefInfluencers = payload.briefInfluencers || state.actv.briefInfluencers;
        state.actv.do = payload.do || state.actv.do;
        state.actv.dont = payload.dont || state.actv.dont;
        state.actv.caption = payload.caption || state.actv.caption;
        state.actv.productNeed = payload.productNeed || state.actv.productNeed;
        state.actv.gender = payload.gender || state.actv.gender;
        state.actv.location = payload.location || state.actv.location;
        state.actv.age = payload.age || state.actv.age;
        state.actv.minFollowers = payload.minFollowers || state.actv.minFollowers;
        state.actv.postingLanguages = payload.postingLanguages || state.actv.postingLanguages;
        state.actv.interests = payload.interests || state.actv.interests;
    }),

    postError: action((state, payload) => {
        state.errors.postErrorMessage = payload;
    }),
    listCampaign: thunk(async (actions, payload, helpers) => {
        const channelId = helpers.getStoreState().channels.activeChannelId;
        const res = await axios.get(`${config.apiUrl}/channels/${channelId}/campaigns/`);
        console.log(res.data)

        actions.updateCampaignList(res.data);


    }),
    getCampaign: thunk(async (actions, payload, helpers) => {
        const channelId = helpers.getStoreState().channels.activeChannelId;

        const id = payload
        const res = await axios.get(`${config.apiUrl}/channels/${channelId}/campaigns/${id}`,

        );
        console.log(res)
        const { data } = await res;
        actions.updateCampaign(data);

    }),
    putCampaign: thunk(async (actions, payload, helpers) => {
        const id = payload.id

        const obj = {
            serviceName: payload.serviceName,
            serviceDescription: payload.serviceDescription,
            category: payload.category,
            coverImage: payload.coverImage,
            callForAction: payload.callForAction,
            briefInfluencers: payload.briefInfluencers,
            do: payload.do,
            dont: payload.dont,
            caption: payload.caption,
            productNeed: payload.productNeed,
            gender: payload.gender,
            location: payload.location,
            age: payload.age,
            minFollowers: payload.minFollowers,
            postingLanguages: payload.postingLanguages,
            interests: payload.interests,
        }
        try {
            const channelId = helpers.getStoreState().channels.activeChannelId;
            actions.updateLoading(true);

            const res = await axios.put(`${config.apiUrl}/channels/${channelId}/campaigns/${id}`, obj,)
            actions.updateCampaign(res.data);

            toastr.success("Successfully updated data");

        } catch (error) {

            actions.postError("Form values are not correct.")
            toastr.error("There was problem saving you data")


        }
        actions.updateLoading(false);

    }),
    influencersCampaign: thunk(async function (actions, payload, helpers) {
        try {
            const channelId = helpers.getStoreState().channels.activeChannelId;
            const res = await axios.get(`${config.apiUrl}/channels/${channelId}/campaigns/`)
            actions.updateCampaignList(res.data);
        }
        catch (error) {
            console.log(error)
        }
    }),
    influencersActiveCampaign: thunk(async function (actions, payload, helpers) {
        try {
            const channelId = helpers.getStoreState().channels.activeChannelId;
            const res = await axios.get(`${config.apiUrl}/channels/${channelId}/campaigns/active`)
            actions.updateActiveCampaigns(res.data);
        }
        catch (error) {
            console.log(error)

        }
    }),
};