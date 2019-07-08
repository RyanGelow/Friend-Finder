const express = require('express');
const router = express.Router();
const friendList = require('./../data/friends.js')
// all of the routes here have /api prepended to it

router.route('/survey')
    .get(friendMaker.addFriend);

app.get("/api/friends", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "survey.html"));
});



module.exports = router;

