var ChatModel = require('./chat.model.js');

module.exports = {
    init: init
}


function init(socket) {
    console.log("Initializing Socket");
    socket.on('joinChannelRooms', (data) => joinChannelRooms(socket, data));
    socket.on('joinBrandRooms', (data) => joinBrandRooms(socket, data));
    socket.on('send', data => send(socket, data));
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
}

async function joinChannelRooms(socket, { channelId }) {
    try {
        const rooms = await ChatModel
            .find({ channel: channelId })
            .populate('campaign')
            .populate('channel', 'channelName')
            .populate('brand', 'name');
        const parsedRooms = [];
        for (let room of rooms) {
            socket.join(room.id)
            parsedRooms.push({
                id: room.id,
                title: room.campaign.serviceName,
                channel: room.channel,
                brand: room.brand
            });
        }
        if (parsedRooms.length > 0) {
            socket.emit('refreshRooms', parsedRooms);
        }
        setTimeout(() => {
            console.log("Current rooms: ");
            console.log(Object.keys(socket.rooms));
        }, 1000);
    } catch (error) {
        console.error("Unable to join rooms");
        console.error(error);
    }
}

async function joinBrandRooms(socket, { brandId }) {
    try {
        const rooms = await ChatModel
            .find({ brand: brandId })
            .populate('campaign')
            .populate('channel', 'channelName')
            .populate('brand', 'name')
        // .execPopulate();
        const parsedRooms = [];
        for (let room of rooms) {
            socket.join(room.id)
            parsedRooms.push({
                id: room.id,
                title: room.campaign.serviceName,
                channel: room.channel,
                brand: room.brand
            });
        }
        if (parsedRooms.length > 0) {
            socket.emit('refreshRooms', parsedRooms);
        }
        setTimeout(() => {
            console.log("Current rooms: ");
            console.log(Object.keys(socket.rooms));
        }, 1000);
    } catch (error) {
        console.error("Unable to join rooms");
        console.error(error);
    }
}


async function send(socket, data) {
    try {
        const { id, value, fromBrand } = data;
        const text = {
            date: new Date(),
            fromBrand,
            value,
        }
        await ChatModel.update(
            { _id: id },
            { $push: { 'texts': text } }
        );
        socket.to(id).emit('receive', data);
        // res.status(200).send("Sent");
    } catch (error) {
        console.error('Error: ', error)
        // res.status(500).send('Failed')
    }
}
