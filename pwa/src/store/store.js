import { createStore, action, thunk } from 'easy-peasy';
import axios from 'axios';
import config from '../config.json';



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
            localStorage.setItem('userInfo', JSON.stringify(state))
        }),
        toggleLoading: action((state, payload) => {
            state.loading = payload;
        }),
        loginError: action((state, payload) => {
            state.errors.loginErrorMessage = payload;
        }),
        finishSignupError: action((state, payload) => {
            state.errors.loginErrorMessage = payload;
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
                    { headers: { 'Authorization': `Bearer ${token}` } }
                );
                actions.updateUser(response.data);
            } catch (error) {
                actions.finishSignupError('Failed to finish the profile');
            }
            actions.toggleLoading(false);
        })

    }
});
