import axios from 'axios';
import config from '../config.json';
import * as toastr from 'toastr';
import io from 'socket.io-client';
import { store } from '../store/store'
export const socket = io(config.socketHost);


const { role, token } = JSON.parse(localStorage.getItem('userInfo')) || { role: '', token: { value: '' } };


socket.on('connect', () => {
    console.log("Connection joined");
    socket.emit('assignUser', { id: "111111111111111111111111", token: token?.value });
})


