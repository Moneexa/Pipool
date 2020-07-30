var express = require('express');
var router = express.Router();
var brandController = require('./brandController.js');
var auth= require('../auth/auth')

/*
 * GET
 */
router.get('/', auth.verify, brandController.list);

/*
 * GET
 */
router.get('/:id', auth.verify, brandController.show);

/*
 * POST
 */
router.post('/', auth.verify , brandController.create);

/*
 * PUT
 */
router.put('/:id', auth.verify, brandController.update);

/*
 * DELETE
 */
router.delete('/:id', brandController.remove);

module.exports = router;
