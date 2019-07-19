const express = require('express');
const router = express.Router();
const friendFinder = require('./../controllers/friendFinder')
// all of the routes here have app/routes/apiRoutes prepended to it

router.route('/find-friend')
    .get(friendFinder.all)
    .post(friendFinder.all);

module.exports = router;

