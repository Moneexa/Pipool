import { createStore, action, thunk } from 'easy-peasy';
import axios from 'axios';
import config from '../config.json';
import { notify } from 'reapop';
import { reducer as notificationsReducer } from 'reapop';
import * as toastr from 'toastr';




const localStorageData = JSON.parse(localStorage.getItem('userInfo') || "{}");
// default user info
let user = {
    isLoggedIn: false,
    id: "",
    name: "",
    email: "",
    role: "",
    token: {
        value: "",
        expiry: new Date(-8640000000000000)
    },
};
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
let campaign = {
    id: "",
    serviceName: "",
    serviceDescription: "",
    category: "",
    coverImage: "",
    callForAction: "",
    briefInfluencers: "",
    do: "",
    dont: "",
    caption: "",
    productNeed: "",
    gender: "",
    location: "",
    age: "",
    minFollowers: "",
    postingLanguages: "",
    influencers: "",

};
if (localStorageData && localStorageData.token) {
    localStorageData.token.expiry = new Date(localStorageData.token.expiry);
    if (localStorageData.token.expiry > new Date()) {
        user = localStorageData;
        axios.defaults.headers['Authorization'] = `Bearer ${user.token.value}`;

    }
}

export const store = createStore({
    user: {
        isLoggedIn: user.isLoggedIn,
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: {
            value: user.token.value,
            expiry: user.token.expiry
        },
        errors: {
            loginErrorMessage: "",
            finishSignupMessage: ""
        },
        loading: false,
        updateUser: action((state, payload) => {
            state.isLoggedIn = true;
            state.id = payload.id || state.id;
            state.name = payload.name || state.name;
            state.email = payload.email || state.email;
            state.role = payload.role || state.role;

            state.token.value = payload.token.value;

            state.token.expiry = payload.token.expiry;
            axios.defaults.headers['Authorization'] = `Bearer ${payload.token.value}`;
            localStorage.setItem('userInfo', JSON.stringify(state))
            console.log(JSON.stringify(state))
        }),
        toggleLoading: action((state, payload) => {
            state.loading = payload;
        }),
        loginError: action((state, payload) => {
            state.errors.loginErrorMessage = payload;
        }),
        finishSignupError: action((state, payload) => {
            state.errors.finishSignupMessage = payload;
        }),
        login: thunk(async (actions, payload) => {
            try {
                actions.toggleLoading(true);
                const res = await axios.post(`${config.apiUrl}/auth/login`, payload)
                console.log(res.data)
                actions.updateUser(res.data);
            
               
       
            } catch (error) {
                
                actions.loginError("Username or password is incorrect.")

            }
            actions.toggleLoading(false);
        }),
        loginFacebook: thunk(async (actions, payload) => {
            const code = payload;
            if (!code) {
                actions.loginError("Failed to authorize user.")
            } else {
                try {
                    actions.toggleLoading(true);
                    const res = await axios.post(`${config.apiUrl}/auth/login/facebook`, { code })
                    actions.updateUser(res.data);
                } catch (error) {
                    actions.loginError("Failed to authorize user.")
                    toastr.error("there was error in logging in");


                }
            }
            actions.toggleLoading(false);
        }),
        loginGoogle: thunk(async (actions, payload) => {
            const code = payload;
            if (!code) {
                actions.loginError("Failed to authorize user.")
            } else {
                try {
                    actions.toggleLoading(true);
                    const res = await axios.post(`${config.apiUrl}/auth/login/google`, { code })
                    actions.updateUser(res.data);
                } catch (error) {
                    actions.loginError("Failed to authorize user.")
                    toastr.error("there was error in logging in");
                }
            }
            actions.toggleLoading(false);
        }),
        loginLinkedin: thunk(async (actions, payload) => {
            const code = payload;
            if (!code) {
                actions.loginError("Failed to authorize user.")
            } else {
                try {
                    actions.toggleLoading(true);
                    const res = await axios.post(`${config.apiUrl}/auth/login/linkedin`, { code })
                    actions.updateUser(res.data);
                    //toastr.success("logged in successfully")
                } catch (error) {
                    actions.loginError("Failed to authorize user.")
                    toastr.error("There was an error logging in")
                }
            }
            actions.toggleLoading(false);
        }),
        signup: thunk(async (actions, payload) => {
            const email = payload;
            try {
                actions.toggleLoading(true);
                const res = await axios.post(`${config.apiUrl}/auth/signup`, { email })
                //console.log(res)
                 toastr.success("check your email")
            } catch (error) {
                actions.loginError("Failed to authorize user.")
                // toastr.error("");
            }
            actions.toggleLoading(false);
        }),
        finishSignup: thunk(async (actions, payload) => {
            const body = payload.body;
            const token = payload.token;

            try {
                actions.toggleLoading(true);
                const response = await axios.post(
                    `${config.apiUrl}/auth/signup/finish`,
                    body, {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }

                );
                actions.updateUser(response.data);
            } catch (error) {
                actions.finishSignupError("The link you're using is either expired or invalid");
                toastr.error("The link you're using is either expired or invalid")

            }
            actions.toggleLoading(false);
        })

    },
    brand: {
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
        token: {
            value: user.token.value,
            expiry: user.token.expiry
        },
        errors: {
            postErrorMessage: "",
        },

        updateBrandList: action((state, payload) => {
            state.list = payload;
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
        /* notify_: action((state, payload)=>{
           
             notify({message: payload.message, status: payload.status})
 
         }),
          
         notificationReducer:thunk (async(actions, payload)=>{
            
             actions.notify_(payload);
 
         }),*/


        listBrands: thunk(async (actions, payload) => {

            const token = user.token.value;
            console.log(token.value)
            const res = await axios.get(`${config.apiUrl}/brands/`);
            console.log(res.data)

            actions.updateBrandList(res.data);


        }),
        get: thunk(async (actions, payload) => {
            const token = user.token.value;

            const id = payload
            const res = await axios.get(`${config.apiUrl}/brands/${id}`,

            );
            console.log(res)
            const { data } = await res;
            actions.updateBrand(res.data);

        }),
        put: thunk(async (actions, payload) => {
            const id = payload.id
            const token = user.token.value;

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
                if (token) {
                    const res = await axios.put
                        (
                            `${config.apiUrl}/brands/${id}`, obj,
                        )


                    actions.updateBrand(res.data);
                    notify({ message: res.statusText, status: res.statusCode })
                    toastr.success("Successfully updated data");


                }
            } catch (error) {

                actions.postError("Form values are not correct.")
                toastr.error("There was problem saving you data")


            }
        }),

        post: thunk(async (actions, payload) => {
            const token = user.token.value;
            console.log(token)
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
                const res = await axios.post(`${config.apiUrl}/brands/`, obj,

                )

                actions.updateBrand(res.data);
                toastr.success("Successfully  data has been sent");

                notify({ message: res.statusText, status: res.statusCode })


            } catch (error) {

                actions.postError("Failed to create brand.")
                toastr.error("There was problem saving you data")


            }
        }),


    },
    campaign: {
        campaignList: [],
        actv: {
            id: campaign.id,
            serviceName: campaign.serviceName,
            serviceDescription: campaign.serviceDescription,
            category: campaign.category,
            coverImage: campaign.coverImage,
            callForAction: campaign.callForAction,
            briefInfluencers: campaign.briefInfluencers,
            do: campaign.do,
            dont: campaign.dont,
            caption: campaign.caption,
            productNeed: campaign.productNeed,
            gender: campaign.gender,
            location: campaign.location,
            age: campaign.age,
            minFollowers: campaign.minFollowers,
            postingLanguages: campaign.postingLanguages,
            influencers: campaign.influencers,
        },

        token: {
            value: user.token.value,
            expiry: user.token.expiry
        },
        errors: {
            postErrorMessage: "",
        },
        updateCampaignList: action((state, payload) => {
            state.campaignList = payload;
        }),

        updateCampaign: action((state, payload) => {
            state.actv.id = payload._id || state.actv.id;
            state.actv.serviceName = payload.serviceName || state.actv.serviceName;
            state.actv.serviceDescription = payload.serviceDescription || state.actv.serviceDescription;
            state.actv.category = payload.category || state.actv.category;
            state.actv.coverImage = payload.coverImage || state.actv.coverImage;
            state.actv.callForAction = payload.callForAction || state.actv.callForAction;
            state.actv.briefInfluencers = payload.briefInfluencers || state.actv.briefInfluencers;
            state.actv.do = payload.do || state.actv.do;
            state.actv.dont = payload.dont || state.actv.dont;
            state.actv.caption = payload.caption || state.actv.caption;
            state.actv.productNeed = payload.productNeed || state.actv.productNeed;
            state.actv.gender = payload.gender || state.actv.gender;
            state.actv.location = payload.location || state.actv.location;
            state.actv.age = payload.age || state.actv.age;
            state.actv.minFollowers = payload.minFollowers || state.actv.minFollowers;
            state.actv.postingLanguages = payload.postingLanguages || state.actv.postingLanguages;
            state.actv.influencers = payload.influencers || state.actv.influencers;
        }),

        postError: action((state, payload) => {
            state.errors.postErrorMessage = payload;
        }),
        listCampaign: thunk(async (actions, payload) => {

            const token = user.token.value;
            console.log(token.value)
            const res = await axios.get(`${config.apiUrl}/campaigns/`);
            console.log(res.data)

            actions.updateCampaignList(res.data);


        }),
        getCampaign: thunk(async (actions, payload) => {
            const token = user.token.value;

            const id = payload
            const res = await axios.get(`${config.apiUrl}/campaigns/${id}`,

            );
            console.log(res)
            const { data } = await res;
            actions.updateCampaign(res.data);

        }),
        putCampaign: thunk(async (actions, payload) => {
            const id = payload.id
            const token = user.token.value;

            const obj = {
                serviceName: payload.serviceName,
                serviceDescription: payload.serviceDescription,
                category: payload.category,
                coverImage: payload.coverImage,
                callForAction: payload.callForAction,
                briefInfluencers: payload.briefInfluencers,
                do: payload.do,
                dont: payload.dont,
                caption: payload.caption,
                productNeed: payload.productNeed,
                gender: payload.gender,
                location: payload.location,
                age: payload.age,
                minFollowers: payload.minFollowers,
                postingLanguages: payload.postingLanguages,
                influencers: payload.influencers,
            }
            try {
                if (token) {
                    const res = await axios.put
                        (
                            `${config.apiUrl}/campaigns/${id}`, obj,
                        )


                    actions.updateCampaign(res.data);
                    notify({ message: res.statusText, status: res.statusCode })
                    toastr.success("Successfully updated data");


                }
            } catch (error) {

                actions.postError("Form values are not correct.")
                toastr.error("There was problem saving you data")


            }
        }),

        postCampaign: thunk(async (actions, payload) => {
            const token = user.token.value;
            console.log(token)
            const obj = {
                serviceName: payload.serviceName,
                serviceDescription: payload.serviceDescription,
                category: payload.category,
                coverImage: payload.coverImage,
                callForAction: payload.callForAction,
                briefInfluencers: payload.briefInfluencers,
                do: payload.dos,
                dont: payload.donts,
                caption: payload.caption,
                productNeed: payload.productNeed,
                gender: payload.gender,
                location: payload.location,
                age: payload.age,
                minFollowers: payload.minFollowers,
                postingLanguages: payload.postingLanguages,
                influencers: payload.interests,
            }
            try {
                const res = await axios.post(`${config.apiUrl}/campaigns/`, obj,

                )

                actions.updateCampaign(res.data);
                toastr.success("Successfully  data has been sent");

                notify({ message: res.statusText, status: res.statusCode })


            } catch (error) {

                actions.postError("Failed to create brand.")
                toastr.error("There was problem saving you data")


            }
        }),
    },
        //notifications: thunk(notificationsReducer())
    });
