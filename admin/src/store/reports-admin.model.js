import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';

const { action, thunk } = require("easy-peasy");
export const reportsAdminModel = {

    reportsList: [],
    report: {
        id: null,
        message: "",
        dateOfSubmission: "",
        author: {},
        campaign: "",

    },
    errors: {
        postErrorMessage: "",
    },
    updateReportsList: action((state, payload) => {
        state.reportsList = payload;
        console.log(state.reportsList)
    }),
    listReports: thunk(async (actions, payload) => {
        const res = await axios.get(`${config.apiUrl}/admin/reports/`);
        console.log(res.data)


        actions.updateReportsList(res.data);


    }),

}