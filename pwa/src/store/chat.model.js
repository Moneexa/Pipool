import axios from 'axios';
import config from '../config.json';
import io from 'socket.io-client';
import { action, thunk } from "easy-peasy";
const socket = io(config.socketHost);


const { role, token } = JSON.parse(localStorage.getItem('userInfo')) || { role: '', token: { value: '' } };

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
    createChat: thunk(async (payload) => {
        axios.post(`${config.apiUrl}/chats`, payload)
    }),
    changeActiveRoom: thunk(async (actions, payload) => {
        try {
            const { data } = await axios.get(`${config.apiUrl}/chats/${payload.id}`);
            console.log(token)
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

// socket.on('connect', () => {
//     console.log("Connection joined");
//     if (role === 'influencer') {
//         const channelId = localStorage.getItem('activeChannelId');
//         if (channelId)
//             socket.emit('assignUser', { id: channelId, token: token?.value });
//         else
//             console.error("No channel id found")
//     } else if (role === 'brand') {
//         const brandId = localStorage.getItem('activeBrandId');
//         if (brandId)
//             socket.emit('assignUser', { id: brandId, token: token?.value });
//         else
//             console.error("No brand id found")
//     }
// })

// socket.on('receive', (data) => {
//     store.dispatch({ type: '@action.chats.pushMessage', payload: data });
// });

