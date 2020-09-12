import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';

const { action, thunk } = require("easy-peasy");
let chat = {
    sentBy: "",
    date: "",
    chat: "",


};
export const chatModel = {
    chatArray: [],
    chats: {
        sentBy: "", date: "", chat: ""
    },
    sentBy:"" , 
    updateChatArray: action((state,payload)=>{
        state.chatArray=payload
    }),
    updateSentBy: action((state,payload)=>{state.sentBy=payload}),
    updateChat: action((state,payload)=>{
        state.chats=payload
    }),
    postChat: thunk((actions, payload)=>{
        actions.updateChatArray(payload)
    }),
    getChat: thunk((actions, payload)=>{
        actions.updateChatArray(payload);
    }),
    getSentBy: thunk((actions, payload)=>{
        actions.updateSentBy(payload)
    }),


}