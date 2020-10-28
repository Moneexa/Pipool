var express = require('express');
var router = express.Router({ mergeParams: true });
var chatController = require('./chat.controller');
var auth = require('../../../auth/auth');

router.post('/', chatController.create);
router.get('/', chatController.listRooms);
router.get('/:id', chatController.listMessages);

module.exports = router;
