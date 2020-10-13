var express = require('express');
var router = express.Router();
var chatController = require('./chat.controller');
var auth= require('../../../auth/auth');
//const { verify } = require('jsonwebtoken');
/*
 * POST
 */
router.post('/', auth.verify, chatController.create);
router.get('/:id', auth.verify, chatController.listMessages);

/*
 * PUT
 */
// router.put('/:id', auth.verify, chatController.update);

/*
 * DELETE
 */
// router.delete('/:id', auth.verify, chatController.remove);
// router.get('/', auth.verify, chatController.suggestedCampaigns);
module.exports = router;
