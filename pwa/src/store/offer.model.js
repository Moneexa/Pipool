import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';

const { action, thunk } = require("easy-peasy");

export const OfferModel = {
    loading: false,
    offerList: [],
    updateOffersList: action((state, payload) => {
        state.offerList = payload;
        console.log(state.offerList)
    }),
    updateLoading: action((state, payload) => {
        state.loading = payload
    }),
    postError: action((state, payload) => {
        state.errors.postErrorMessage = payload;
    }),

    listOffers: thunk(async (actions, payload, helpers) => {
        const channelId = helpers.getStoreState().channels.activeChannelId;
        const res = await axios.get(`${config.apiUrl}/channels/${channelId}/offers/`);
        console.log(res.data)

        actions.updateOffersList(res.data);
    }),
    createOffer: thunk(async (actions, payload, helpers) => {
        try {
            const brandId = helpers.getStoreState().brand.activeBrandId;
            actions.updateLoading(true);
            const offer = await axios.post(`${config.apiUrl}/brands/${brandId}/offers`, payload)
            console.log(offer)
            actions.updateLoading(false);
            toastr.success("Successfully Sent Offer")


        }
        catch (error) {
            actions.updateLoading(false);

            console.log(error)
            toastr.error("There was a problem sending offer")


        }
    }),
    updateOffer: thunk(async (actions, payload, helpers) => {
        try {
            const channelId = helpers.getStoreState().channels.activeChannelId;
            const res = await axios.put(`${config.apiUrl}/channels/${channelId}/offers/${payload.offerId}`, payload);
            actions.listOffers(res.data);
            console.log(res);

        }
        catch (error) {
            console.log(error)
        }

    }),
    toBePayedOffer: thunk(async (actions, payload, helpers) => {
        try {
            const brandId = helpers.getStoreState().brand.activeBrandId;
            const res = await axios.get(`${config.apiUrl}/brands/${brandId}/offers/unpaid`)
            actions.updateOffersList(res.data)

        }
        catch (error) {
            console.log(error)
        }
    }),
    verifyPayment: thunk(async (actions, payload, helpers) => {
        try {
            const brandId = helpers.getStoreState().brand.activeBrandId;
            await axios.post(`${config.apiUrl}/brands/${brandId}/offers/${payload.offerId}/verify-payment`, payload);
            toastr.success("Payment verified");
            actions.listOffers()
        } catch (error) {
            toastr.error("Unable to verify payment")
        }
    })

};
