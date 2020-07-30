import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';

const { action, thunk } = require("easy-peasy");
let brand = {
    id: "",
    name: "",
    description: "",
    website: "",
    hashTags: "",
    skype: "",
    phoneNo: "",
    contactName: "",
    postalCode: "",
    city: "",
    country: "",
    address: "",

};
export const BrandModel = {
    loading: false,
    list: [],
    active: {
        id: brand.id,
        name: brand.name,
        description: brand.description,
        website: brand.website,
        skype: brand.skype,
        hashTags: brand.hashTags,
        contactName: brand.contactName,
        phoneNo: brand.phoneNo,
        address: brand.address,
        postalCode: brand.postalCode,
        country: brand.country,
        city: brand.city,

    },
    errors: {
        postErrorMessage: "",
    },

    updateBrandList: action((state, payload) => {
        state.list = payload;
    }),
    updateLoading: action((state, payload) => {
        state.loading = payload
    }),

    updateBrand: action((state, payload) => {
        state.active.id = payload._id || state.active.id;
        state.active.name = payload.name || state.active.name;
        state.active.description = payload.description || state.active.description;
        state.active.website = payload.website || state.active.website;
        state.active.skype = payload.skype || state.active.skype;
        state.active.contactName = payload.contactName || state.active.contactName;
        state.active.phoneNo = payload.phoneNo || state.active.phoneNo;
        state.active.address = payload.address || state.active.address;
        state.active.postalCode = payload.postalCode || state.active.postalCode;
        state.active.country = payload.country || state.active.country;
        state.active.city = payload.city || state.active.city;
        state.active.hashTags = payload.hashTags || state.active.hashTags;
    }),

    postError: action((state, payload) => {
        state.errors.postErrorMessage = payload;
    }),

    listBrands: thunk(async (actions, payload) => {
        const res = await axios.get(`${config.apiUrl}/brands/`);
        console.log(res.data)

        actions.updateBrandList(res.data);


    }),
    get: thunk(async (actions, payload) => {

        const id = payload
        const res = await axios.get(`${config.apiUrl}/brands/${id}`,

        );
        console.log(res)
        const { data } = await res;
        actions.updateBrand(res.data);

    }),
    put: thunk(async (actions, payload) => {
        const id = payload.id

        const obj = {
            name: payload.name,
            description: payload.description,
            website: payload.website,
            skype: payload.skype,
            phoneNo: payload.phoneNo,
            contactName: payload.contactName,
            city: payload.city,
            country: payload.country,
            postalCode: payload.postalCode,
            hashTags: payload.hashTags,
            address: payload.address,
        }
        try {
            actions.updateLoading(true);

            const res = await axios.put(`${config.apiUrl}/brands/${id}`, obj)

            actions.updateBrand(res.data);

            toastr.success("Successfully updated data");


        } catch (error) {
            actions.postError("Form values are not correct.")
            toastr.error("There was problem saving you data")
        }
        actions.updateLoading(false);

    }),

    post: thunk(async (actions, payload) => {
        const obj = {
            name: payload.name,
            description: payload.description,
            website: payload.website,
            skype: payload.skype,
            phoneNo: payload.phoneNo,
            contactName: payload.contactName,
            city: payload.city,
            country: payload.country,
            postalCode: payload.postalCode,
            hashTags: payload.hashTags,
            address: payload.address,
        }
        try {
            actions.updateLoading(true);

            const res = await axios.post(`${config.apiUrl}/brands/`, obj)

            actions.updateBrand(res.data);
            toastr.success("Successfully  data has been sent");




        } catch (error) {

            actions.postError("Failed to create brand.")
            toastr.error("There was problem saving you data")


        }
        actions.updateLoading(false);

    }),


};