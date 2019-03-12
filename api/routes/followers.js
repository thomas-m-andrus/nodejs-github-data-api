const express = require('express');
const router = express.Router();
const followersController = require("./../controllers/followers");

router.get('/:userId', followersController.getUserFollowers);
module.exports = router;