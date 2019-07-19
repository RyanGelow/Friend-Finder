const friends = require('./../data/friends.js')

const friendFinder = {
    all: (req, res) => {
        console.log(res.json(friends))
    }
}

module.exports = friendFinder;