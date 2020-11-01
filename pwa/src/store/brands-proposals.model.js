import axios from 'axios';
import config from '../config.json';

const { action, thunk } = require("easy-peasy");
export const brandsProposalModel = {
    loading: false,
    proposalsList: [],
    campaignId: "",
    campaignProposals: [],
    errors: {
        postErrorMessage: "",
    },
    updateProposalsList: action((state, payload) => {
        state.proposalsList = payload;
        console.log(state.proposalsList)
    }),
    updateLoading: action((state, payload) => {
        state.loading = payload
    }),
    postError: action((state, payload) => {
        state.errors.postErrorMessage = payload;
    }),
    setCampaignProposals: action((state, { campaignId, proposals }) => {
        state.campaignId = campaignId;
        state.campaignProposals = proposals;
    }),
    listProposals: thunk(async (actions, helpers) => {
        const brandId = helpers.getStoreState().brand.activeBrandId;
        const res = await axios.get(`${config.apiUrl}/brands/${brandId}/proposals/`);
        console.log(res.data)

        actions.updateProposalsList(res.data);
    }),
    getCampaignProposals: thunk(async (actions, payload, helpers) => {
        const brandId = helpers.getStoreState().brand.activeBrandId;
        const id = payload
        actions.updateLoading(true);
        actions.setCampaignProposals({ campaignId: id, proposals: [] })
        const res = await axios.get(`${config.apiUrl}/brands/${brandId}/campaigns/${id}/proposals/`);
        const { data } = await res;
        console.log(data)
        actions.setCampaignProposals({ campaignId: id, proposals: data })
        actions.updateLoading(false);
    }),
    checkIfAlreadySubmitted: thunk(async (actions, { campaignId }) => {
        try {
            const res = await axios.get(`${config.apiUrl}/influencers/proposals/${campaignId}`);
            if (res.data) {
                actions.setProposalSubmitted(true);
            }
        } catch (error) {
            console.log(error)
        }
    })
};