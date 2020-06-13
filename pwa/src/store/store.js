import { createStore, action } from 'easy-peasy';


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
    todos: {
        items: ['Create store', 'Wrap application', 'Use store'],
        add: action((state, payload) => {
            state.items.push(payload)
        })
    },
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
        login: action((state, payload) => {
            console.log(state)
            state.isLoggedIn = true;
            state.id = payload.id || state.id;
            state.name = payload.name || state.name;
            state.email = payload.email || state.email;
            state.role = payload.role || state.role;
            state.token.value = payload.token.value;
            state.token.expiry = payload.token.expiry;
            localStorage.setItem('userInfo', JSON.stringify(state))
        })
    }
});
