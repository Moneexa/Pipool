import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';

const { action, thunk } = require("easy-peasy");
let videos = {
    id: "",
    name: "",
    fileName: "",


};
export const videosModel = {
    loading: false,
    videosList: [],
    actv: {
        id: videos.id,
        name: videos.name,
        fileName: videos.fileName,
    },
    errors: {
        postErrorMessage: "",
    },
    updateVideosList: action((state, payload) => {
        state.videosList = payload;
        console.log(state.videosList)
    }),
    pushVideosList: action((state, payload) => {
        state.videosList = [...state.videosList, payload];
        console.log(state.videosList)
    }),
    updateLoading: action((state, payload) => {
        state.loading = payload
    }),
    updateVideos: action((state, payload) => {
        state.actv.id = payload._id || state.actv.id;
        state.actv.name = payload.name || state.actv.name;
        state.actv.fileName = payload.fileName || state.actv.fileName;
    }),

    postError: action((state, payload) => {
        state.errors.postErrorMessage = payload;
    }),
    listVideos: thunk(async (actions, payload) => {
        const res = await axios.get(`${config.apiUrl}/videos/`);
        console.log(res.data)

        actions.updateVideosList(res.data);


    }),
    getVideos: thunk(async (actions, payload) => {
        const id = payload
        const res = await axios.get(`${config.apiUrl}/videos/${id}`,
        );
        console.log(res)
        const { data } = await res;
        console.log(data)
        actions.updateVideosList(data);

    }),
    putVideos: thunk(async (actions, payload) => {
        const id = payload.id

        const obj = {
            name: payload.name,
            fileName: payload.fileName,

        }
        try {
            actions.updateLoading(true);

            const res = await axios.put(`${config.apiUrl}/videos/${id}`, obj,)
            actions.updateVidoes(res.data);

            toastr.success("Successfully updated data");

        } catch (error) {

            actions.postError("Form values are not correct.")
            toastr.error("There was problem saving you data")


        }
        actions.updateLoading(false);

    }),

    postVideo: thunk(async (actions, payload) => {
        try {
            actions.updateLoading(true);

            const res = await axios.post(`${config.apiUrl}/videos/`, payload)

            actions.pushVideosList(res.data);
            toastr.success("File uploaded successfully");

        } catch (error) {
            console.log(error)
            toastr.error("you have already submitted the proposal")


        }
        actions.updateLoading(false);

    }),

};