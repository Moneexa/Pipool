import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';

const { action, thunk } = require("easy-peasy");
export const CampaignInsightsModel = {
    loading: false,
    campaignList: [],
    updateCampaignList: action((state, payload) => {
        state.campaignList = payload;
    }),
    updateLoading: action((state, payload) => {
        state.loading = payload
    }),

    listCampaign: thunk(async (actions, payload, helpers) => {
        const res = await axios.get(`${config.apiUrl}/admin/campaigns/`);
        console.log(res.data)

        actions.updateCampaignList(res.data);

    }),
};