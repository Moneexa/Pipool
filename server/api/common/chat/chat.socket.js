const jwt = require('jsonwebtoken');
const ChatModel = require('./chat.model.js');
const ChannelModel = require('../../channels/channelsModel');
const BrandModel = require('../../brands/brandModel');
const config = require('../../../config.json');
module.exports = {
    init: init
}


function init(socket) {
    console.log("Initializing Socket");
    socket.on('assignUser', (data) => assignUser(socket, data));
    socket.on('send', data => send(socket, data));
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
}

async function assignUser(socket, { token, id }) {
    try {
        jwt.verify(token, config.privateKey, async function (err, decoded) {
            if (err) {
                socket.emit("error", "Invalid Jwt");
            } else {
                switch (decoded.role) {
                    case 'influencer':
                        const channel = await ChannelModel.findOne({ _id: id, createdBy: decoded.id });
                        if (!channel) throw "Invalid Channel Id provided";
                        socket.join(id)
                        break;
                    case 'brand':
                        const brand = await BrandModel.findOne({ _id: id, createdBy: decoded.id });
                        if (!brand) throw "Invalid Brand Id provided";
                        socket.join(id)
                        break;
                    case 'admin':
                        socket.join(id)
                        break;
                    case 'default':
                        socket.disconnect();
                        break;
                }
            }
        });
    } catch (error) {
        console.error("Unable to join rooms");
        console.error(error);
    }
}


async function send(socket, data) {
    try {
        const { from, to, fromBrand, roomId, value } = data;
        const text = {
            date: new Date(),
            fromBrand,
            value,
        }
        await ChatModel.update(
            { 
                '_id': roomId,
                '$or': [
                    {
                        'brand': from,
                        'channel': to
                    },
                    {
                        'brand': to,
                        'channel': from
                    }
                ]
            },
            { $push: { 'texts': text } }
        );
        socket.to(to).emit('receive', data);
        // res.status(200).send("Sent");
    } catch (error) {
        console.error('Error: ', error)
        // res.status(500).send('Failed')
    }
}
