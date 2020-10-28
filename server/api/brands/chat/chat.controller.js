var ChatModel = require('../../common/chat/chat.model');
// var ProposalModel = require('../../common/proposals/proposalsModel');



module.exports = {
    listMessages,
    listRooms
}

async function listRooms(req, res) {
    try {
        const rooms = await ChatModel
            .find({ brand: req.params.brandId })
            .populate('campaign')
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