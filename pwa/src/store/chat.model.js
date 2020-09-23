import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';
import io from 'socket.io-client';
import { store } from '../store/store'
import { action, thunk } from "easy-peasy";
const socket = io(config.socketHost);


const { role } = JSON.parse(localStorage.getItem('userInfo')) || { role: '' };

export const ChatModel = {
    activeRoom: {
        id: null,
        title: '',
        channel: '',
        brand: ''
    },
    role: role,
    rooms: [],
    messages: [],
    setRooms: action((state, payload) => {
        state.rooms = payload;
    }),
    setActiveRoom: action((state, payload) => {
        state.activeRoom = payload;
    }),
    pushMessage: action((state, payload) => {
        state.messages = [...state.messages, payload];
    }),
    setMessages: action((state, payload) => {
        state.messages = payload;
    }),
    createChat: thunk(async (actions, payload) => {
        axios.post(`${config.apiUrl}/chats`, payload)
    }),
    changeActiveRoom: thunk(async (actions, payload) => {
        try {
            const { data } = await axios.get(`${config.apiUrl}/chats/${payload.id}`);
            // actions.setActiveRoom()
            actions.setMessages(data);
        } catch (error) {
            console.error(error)
        }
    }),
    send: thunk(async (actions, { id, message }) => {
        const fromBrand = role === 'brand';
        socket.emit('send', { id, value: message, fromBrand });
        actions.pushMessage({ id, value: message, fromBrand });
    }),
}

socket.on('connect', () => {
    console.log("Connection joined");
    if (role === 'influencer') {
        const channelId = localStorage.getItem('activeChannelId');
        if (channelId)
            socket.emit('joinChannelRooms', { channelId, channelId });
        else
            console.error("No channel id found")
    } else if (role === 'brand') {
        const brandId = localStorage.getItem('activeBrandId');
        if (brandId)
            socket.emit('joinBrandRooms', { brandId, brandId });
        else
            console.error("No brand id found")
    }
})

socket.on('refreshRooms', (data) => {
    store.dispatch({ type: '@action.chats.setRooms', payload: data });
    if (data && data.length > 0 && data[0].id) {
        store.dispatch({
            type: '@action.chats.setActiveRoom', payload: {
                id: data[0].id, 
                title: data[0].title,
                channel: data[0].channel,
                brand: data[0].brand
            }
        })
    }
});
socket.on('receive', (data) => {
    store.dispatch({ type: '@action.chats.pushMessage', payload: data });
});

