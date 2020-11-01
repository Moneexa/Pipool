import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';

const {  thunk } = require("easy-peasy");

export const videosModel = {
    loading: false,
    account: null,
    createAccount: thunk(async (actions) => {
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