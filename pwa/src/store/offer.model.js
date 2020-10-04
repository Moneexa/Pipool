import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';

const { action, thunk, debug } = require("easy-peasy");

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

    listOffers: thunk(async (actions, payload) => {


        const res = await axios.get(`${config.apiUrl}/offer/`);
        console.log(res.data)

        actions.updateOffersList(res.data);
    }),
    createOffer: thunk(async (actions, payload) => {
        try {
            actions.updateLoading(true);

            const offer = await axios.post(`${config.apiUrl}/offer/create`, payload)
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
    updateOffer: thunk(async (actions, payload) => {
        try {

            const res = await axios.put(`${config.apiUrl}/offer/`, payload);
            actions.listOffers(res.data);
            console.log(res);

        }
        catch (error) {
            console.log(error)
        }

    }),
    toBePayedOffer: thunk(async (actions, payload) => {
        try {
            const res = await axios.get(`${config.apiUrl}/offer/to-be-payed`)
            actions.updateOffersList(res.data)

        }
        catch (error) {
            console.log(error)
        }
    }),
    verifyPayment: thunk(async (actions, payload) => {
        try {
            await axios.post(`${config.apiUrl}/offer/verify-payment`, payload);
            toastr.success("Payment verified");
            actions.listOffers()
        } catch (error) {
            toastr.error("Unable to verify payment")
        }
    })

};