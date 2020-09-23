var ChatModel = require('./chat.model.js');
var ProposalModel = require('../proposals/proposalModel');
const config = require('../config.json')
const axios = require('axios')


module.exports = {
    create,
    listMessages
}




async function create(req, res) {

    try {
        const { campaignId, channelId, brandId } = req.body;

        const proposal = await ProposalModel.findOne({ campaignId: campaignId, channelId: channelId });

        if(!proposal) return res.status(400).send("Proposal not submitted yet");

        let initialChat = proposal.proposal;

        let existingChat = await ChatModel.findOne({ brand: brandId, campaign: campaignId, channel: channelId });
        if (existingChat) {
            return res.status(400).send('Chat already exists you cannot create again');
        }

        var chat = new ChatModel({
            brand: brandId,
            campaign: campaignId,
            channel: channelId,
            texts: [{
                date: new Date(),
                fromBrand: false,
                value: initialChat
            }]
        });

        await chat.save();
        return res.status(201).send(chat);
    }
    catch (error) {
        return res.status(500).send({
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