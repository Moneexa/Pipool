import { createStore, action, thunk } from 'easy-peasy';
import axios from 'axios';
import config from '../config.json';
import { notify } from 'reapop';
import {reducer as notificationsReducer} from 'reapop';



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
            console.log(state)
            state.isLoggedIn = true;
            state.id = payload.id || state.id;
            state.name = payload.name || state.name;
            state.email = payload.email || state.email;
            state.role = payload.role || state.role;
            state.token.value = payload.token.value;
            state.token.expiry = payload.token.expiry;
            axios.defaults.headers['Authorization'] = `Bearer ${payload.token.value}`;
            localStorage.setItem('userInfo', JSON.stringify(state))
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
                } catch (error) {
                    actions.loginError("Failed to authorize user.")
                }
            }
            actions.toggleLoading(false);
        }),
        signup: thunk(async (actions, payload) => {
            const email = payload;
            try {
                actions.toggleLoading(true);
                await axios.post(`${config.apiUrl}/auth/signup`, { email })
            } catch (error) {
                actions.loginError("Failed to authorize user.")
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
                    body,

                );
                actions.updateUser(response.data);
            } catch (error) {
                actions.finishSignupError("The link you're using is either expired or invalid");
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
                    notify({message: res.statusText, status: res.statusCode})

                }
            } catch (error) {

                actions.postError("Form values are not correct.")


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

                notify({message: res.statusText, status: res.statusCode})


            } catch (error) {
                 
                actions.postError("Failed to create brand.")

            }
        }),


    }
});
