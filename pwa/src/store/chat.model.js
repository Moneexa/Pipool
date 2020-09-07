import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';


const { action, thunk } = require("easy-peasy");


export const ChatModel = {
    createChat: thunk(async (actions, payload) => {
        axios.post(`${config.apiUrl}/chats`, payload)
    })
}