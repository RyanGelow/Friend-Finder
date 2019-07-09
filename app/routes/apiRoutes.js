const express = require('express');
const router = express.Router();
const friends = require('./../data/friends')
// all of the routes here have /api prepended to it

// router.route('/survey')
//     .get(friendMaker.addFriend);

// app.get("/api/friends", function(req, res) {
//     res.sendFile(path.join(__dirname, "home.html"));
// });

// app.get("/survey", function(req, res) {
//     res.sendFile(path.join(__dirname, "survey.html"));
// });


router.post("/find-friend",function(req, res){
    myvalues = req.body.survey.map(each => Number(each))
    console.log(myvalues)
    console.log(friends[0])
})


module.exports = router;

