import config from '../config.json';
import io from 'socket.io-client';
export const socket = io(config.socketHost);


const { role, token } = JSON.parse(localStorage.getItem('userInfo')) || { role: '', token: { value: '' } };


socket.on('connect', () => {
    console.log("Connection joined");
    if (role === 'influencer') {
        const channelId = localStorage.getItem('activeChannelId');
        if (channelId)
            socket.emit('assignUser', { id: channelId, token: token?.value });
        else
            console.error("No channel id found")
    } else if (role === 'brand') {
        const brandId = localStorage.getItem('activeBrandId');
        if (brandId)
            socket.emit('assignUser', { id: brandId, token: token?.value });
        else
            console.error("No brand id found")
    }
})


