var ChatModel = require('./chat.model.js');
const config = require('../config.json')
const axios = require('axios')


module.exports = {
    create
}




async function create(req, res) {

    try {
        const { campaignId, channelId } = req.body;
        const brandId = res.locals.user.id;

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