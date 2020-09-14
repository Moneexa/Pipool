var ChatModel = require('./chat.model.js');
const config = require('../config.json')
const axios = require('axios')


module.exports = {
    create,
    listMessages
}




async function create(req, res) {

    try {
        const { campaignId, channelId, brandId } = req.body;

        let existingChat = await ChatModel.findOne({ brand: brandId, campaign: campaignId, channel: channelId });
        if (existingChat) {
            return res.status(400).send('Chat already exists you cannot create again');
        }

        var chat = new ChatModel({
            brand: brandId,
            campaign: campaignId,
            channel: channelId
        });

        await chat.save();
        return res.status(201).json(chat);
    }
    catch (error) {
        return res.status(500).json({
            message: 'Error when creating chat',
            error: err
        });
    }
}

async function listMessages(req, res) {
    ChatModel.findOne({ _id: req.params.id }, function (err, chat) {
        if (err || !chat) {
            return res.status(500).json({
                message: 'Error when getting campaign.',
                error: err
            });
        }
        return res.json(chat.texts);
    });
}