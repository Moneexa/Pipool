import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';

const { action, thunk } = require("easy-peasy");



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

if (localStorageData && localStorageData.token) {
    localStorageData.token.expiry = new Date(localStorageData.token.expiry);
    if (localStorageData.token.expiry > new Date()) {
        user = localStorageData;
        axios.defaults.headers['Authorization'] = `Bearer ${user.token.value}`;

    }
}

export const UserModel = {
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

};