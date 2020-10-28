import axios from 'axios';
import config from '../config.json';
import { socket } from './chat.socket';
import * as toastr from 'toastr';
import { BehaviorSubject, ReplaySubject } from 'rxjs';


const loading = new BehaviorSubject(false);
const rooms = new ReplaySubject(1);
const messages = new BehaviorSubject([]);
const activeRoom = new ReplaySubject(1);

export const loading$ = loading.asObservable();
export const rooms$ = rooms.asObservable();
export const messages$ = messages.asObservable();
export const activeRoom$ = activeRoom.asObservable();

export async function listRooms(brandId) {

    try {
        console.log('listing rooms')
        loading.next(true);

        const res = await axios.get(`${config.apiUrl}/brands/${brandId}/chat`);
        console.log(res.data)
        loading.next(false);
        rooms.next(res.data);
        if(res.data?.length > 0)
            changeActiveRoom(brandId, res.data[0])

    } catch (error) {
        toastr.error("Something went wrong while fetching rooms")
    }
}

export async function changeActiveRoom(brandId, room) {

    try {
        console.log('listing chat')
        loading.next(true);
        messages.next([]);
        activeRoom.next(room);

        const res = await axios.get(`${config.apiUrl}/brands/${brandId}/chat/${room._id}`);
        console.log(res.data)
        loading.next(false);
        messages.next(res.data || []);

    } catch (error) {
        toastr.error("Something went wrong while fetching messages")
    }
}

export function send(brandId, channelId, roomId, value) {
    messages.next([...messages.value, {
        date: new Date(),
        fromBrand: false,
        value
    }])
    
    socket.emit('send', {
        from: brandId,
        to: channelId,
        fromBrand: true,
        roomId,
        value
    })
}

socket.on('receive', (data) => {
    messages.next([...messages.value, data])
    console.log('received');
});