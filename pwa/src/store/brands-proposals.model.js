import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';

const { action, thunk, debug } = require("easy-peasy");
let proposals = {
    id: "",
    proposal: "",
    cost: "",
    dateOfSubmission: "",
    campaignId: ""

};
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
    listProposals: thunk(async (actions, payload) => {
        const res = await axios.get(`${config.apiUrl}/proposals/`);
        console.log(res.data)

        actions.updateProposalsList(res.data);
    }),
    getCampaignProposals: thunk(async (actions, payload) => {
        const id = payload
        actions.updateLoading(true);
        actions.setCampaignProposals({ campaignId: id, proposals: [] })
        const res = await axios.get(`${config.apiUrl}/brands/proposals/${id}`);
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