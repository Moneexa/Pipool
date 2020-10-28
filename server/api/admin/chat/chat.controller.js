var ChatModel = require('../../common/chat/chat.model');



module.exports = {
    listMessages,
    listRooms,
    create
}

async function listRooms(req, res) {
    try {
        const rooms = await ChatModel
            .find({
                "$or": [
                    { brand: "111111111111111111111111" },
                    { channel: "111111111111111111111111" }
                ]
            })
            .populate('channel', 'channelName')
            .populate('brand', 'name')
        return res.status(200).send(rooms);

    } catch (error) {
        res.status(500).send("Something went wrong while fetching rooms")
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

async function create(req, res) {

    try {
        const { channelId, brandId, receiverType } = req.body;
        let query = {};
        if (receiverType === 'brand') {
            query = { brand: brandId, channel: "111111111111111111111111" }
        } else {
            query = { channel: channelId, brand: "111111111111111111111111" }
        }

        let existingChat = await ChatModel.findOne(query);
        if (existingChat) {
            return res.status(400).send('Chat already exists you cannot create again');
        }

        let document = {
            brand: brandId,
            channel: channelId,
            campaign: '111111111111111111111111',
            texts: [{}]
        }

        if (receiverType === 'brand') {
            document.channel = "111111111111111111111111";
        } else {
            document.brand = "111111111111111111111111";
        }

        var chat = new ChatModel(document);

        await chat.save();
        return res.status(201).send(chat);
    }
    catch (error) {
        return res.status(500).send({
            message: 'Error when creating chat',
            error: error
        });
    }
}