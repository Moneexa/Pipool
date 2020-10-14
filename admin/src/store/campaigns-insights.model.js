import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';

const { action, thunk } = require("easy-peasy");
let campaign = {
    id: "",
    serviceName: "",
    category: "",

    gender: "",
    location: "",
    age: "",
    minFollowers: "",
    postingLanguages: "",

};
export const CampaignInsightsModel = {
    loading: false,
    campaignList: [],
    activeCampaigns: [],
    actv: {
        id: campaign.id,
        serviceName: campaign.serviceName,
        category: campaign.category,
        gender: campaign.gender,
        location: campaign.location,
        age: campaign.age,
        minFollowers: campaign.minFollowers,
        postingLanguages: campaign.postingLanguages,
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
        state.actv.category = payload.category || state.actv.category;
        state.actv.gender = payload.gender || state.actv.gender;
        state.actv.location = payload.location || state.actv.location;
        state.actv.age = payload.age || state.actv.age;
        state.actv.minFollowers = payload.minFollowers || state.actv.minFollowers;
        state.actv.postingLanguages = payload.postingLanguages || state.actv.postingLanguages;
    }),

    postError: action((state, payload) => {
        state.errors.postErrorMessage = payload;
    }),
    listCampaign: thunk(async (actions, payload, helpers) => {
        const res = await axios.get(`${config.apiUrl}/admin/campaigns/`);
        console.log(res.data)

        actions.updateCampaignList(res.data);


    }),
    listActiveCampaigns: thunk(async (actions, payload, helpers) => {
        const brandId = helpers.getStoreState().brand.activeBrandId;
        const res = await axios.get(`${config.apiUrl}/brands/${brandId}/campaigns/active`);
        console.log(res.data)

        actions.updateActiveCampaigns(res.data);
    }),
    getCampaign: thunk(async (actions, payload, helpers) => {
        const res = await axios.get(`${config.apiUrl}/admin/campaigns/`,

        );
        console.log(res)
        const { data } = await res;
        actions.updateCampaign(data);

    }),
    putCampaign: thunk(async (actions, payload, helpers) => {
        const brandId = helpers.getStoreState().brand.activeBrandId;
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
            actions.updateLoading(true);

            const res = await axios.put(`${config.apiUrl}/brands/${brandId}/campaigns/${id}`, obj,)
            actions.updateCampaign(res.data);

            toastr.success("Successfully updated data");

        } catch (error) {

            actions.postError("Form values are not correct.")
            toastr.error("There was problem saving you data")


        }
        actions.updateLoading(false);

    }),

    postCampaign: thunk(async (actions, payload, helpers) => {
        const brandId = helpers.getStoreState().brand.activeBrandId;
        const obj = {
            serviceName: payload.serviceName,
            serviceDescription: payload.serviceDescription,
            category: payload.category,
            coverImage: payload.coverImage,
            callForAction: payload.callForAction,
            briefInfluencers: payload.briefInfluencers,
            do: payload.dos,
            dont: payload.donts,
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
            actions.updateLoading(true);

            const res = await axios.post(`${config.apiUrl}/brands/${brandId}/campaigns/`, obj)

            actions.updateCampaign(res.data);

            toastr.success("Successfully  data has been sent");



        } catch (error) {

            actions.postError("Failed to create brand.")
            toastr.error("There was problem saving you data")


        }
        actions.updateLoading(false);

    }),
};