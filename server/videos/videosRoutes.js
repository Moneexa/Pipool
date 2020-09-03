var express = require('express');
var router = express.Router();
var videosController = require('./videosController.js');
var auth = require('../auth/auth');
//const { verify } = require('jsonwebtoken');

/*
 * GET
 */
router.get('/', auth.verify, videosController.list);

/*
 * GET
 */
router.get('/:id', auth.verify, videosController.show);

/*
 * POST
 */
router.post('/', auth.verify, videosController.create);

/*
 * PUT
 */
router.put('/:id', auth.verify, videosController.update);

/*
 * DELETE
 */
router.delete('/:id', auth.verify, videosController.remove);
module.exports = router;
