import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';

const { action, thunk } = require("easy-peasy");

export const CustomerModel = {
    loading: false,
    paymentVerified: false,
    setLoading: action((state, { value }) => {
        state.loading = value;
    }),
    setPaymentVerified: action((state, { value }) => {
        state.paymentVerified = value;
    }),
    verifyPayment: thunk(async (actions, payload) => {
        try {
            actions.setLoading(true);
            const { data } = axios.get(config.apiUrl + '/customers/verify-payment-setup');
            actions.setPaymentVerified(true)
            console.log(data);

        } catch (error) {
            console.log(error)
        } finally {
            actions.setLoading(false);
        }
    })
};