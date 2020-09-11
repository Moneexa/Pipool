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
export const influencersProposalModel = {
    loading: false,
    proposalsList: [],
    proposalSubmitted: false,
    actv: {
        id: proposals.id,
        proposal: proposals.proposal,
        cost: proposals.cost,
        dateOfSubmission: proposals.dateOfSubmission,
        campaignId: proposals.campaignId
    },
    setProposalSubmitted: action((state, payload) => {
        return { proposalSubmitted: payload }
    }),
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
    updateProposals: action((state, payload) => {
        state.actv.id = payload._id || state.actv.id;
        state.actv.proposal = payload.proposal || state.actv.proposal;
        state.actv.cost = payload.cost || state.actv.cost;
        state.actv.dateOfSubmission = payload.dateOfSubmission || state.actv.dateOfSubmission;
    }),

    postError: action((state, payload) => {
        state.errors.postErrorMessage = payload;
    }),
    listProposals: thunk(async (actions, payload) => {
        const res = await axios.get(`${config.apiUrl}/proposals/`);
        console.log(res.data)

        actions.updateProposalsList(res.data);


    }),
    getProposals: thunk(async (actions, payload) => {
        const id = payload
        const res = await axios.get(`${config.apiUrl}/proposals/${id}`);
        console.log(res)
        const { data } = await res;
        console.log(data)
        actions.updateProposalsList(data);
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
    }),

    postProposals: thunk(async (actions, payload, helpers) => {
        const channelId = helpers.getStoreState().channels.activeChannelId;
        if (!channelId) {
            throw "No channel selected";
        }
        const obj = {
            proposal: payload.proposal,
            cost: payload.cost,
            dateOfSubmission: payload.dateOfSubmission,
            campaignId: payload.campaignId,
            channelId
        }
        console.log(obj)
        try {
            actions.updateLoading(true);

            const res = await axios.post(`${config.apiUrl}/influencers/proposals/`, obj)

            actions.updateProposals(res.data);
            actions.setProposalSubmitted(true);
            toastr.success("Successfully  data has been sent");



        } catch (error) {
            console.log(error)
            actions.postError("Failed to create brand.")
            if (error.message.slice(32, 35) === "405") {
                toastr.error("you have already submitted the proposal")
            }


        }
        actions.updateLoading(false);

    }),

};