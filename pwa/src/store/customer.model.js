import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';

const { action, thunk } = require("easy-peasy");

export const customerModel = {
    loading: false,
    account: null,
    secret: null,
    customerSaved: false,
    fetchSecret: thunk(async (actions, payload) => {
        try {
            const { data } = axios.post(config.apiUrl + '/bank-accounts');
            console.log(data);

        } catch (error) {
            console.log(error)
            toastr.error("you have already submitted the proposal")
        }
        actions.updateLoading(false);
    }),

};