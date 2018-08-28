var express = require("express");
var path = require("path");
var router = express.Router();
var friendsList = require('../data/friends.js');

router.post('/api/friends', function (req, res) {
    var newSurvey = req.body;
    var pickedFriend;
    var friendCalc = [];
    for (var i = 0; i < friendsList.length; i++) {
        var totalDifference = 0;
        for (var k = 0; k < 10; k++) {
            var scoreDiff = Math.abs(friendsList[i].scores[k] - newSurvey.scores[k]);
            console.log(friendsList,"friendsList"); 
            console.log(newSurvey,"newSurvey");    


            totalDifference += scoreDiff;
            console.log(totalDifference,"totalDiff"); 
            console.log(scoreDiff,"scoreDiff");       


        }
        friendCalc.push({
            name: friendsList[i].name,
            picture: friendsList[i].picture,
            totalDiff: totalDifference
        });
    }
    var maxScore = 40;

    friendCalc.map(function (obj) {
        if (obj.totalDiff < maxScore) maxScore = obj.totalDiff;
    });
    pickedFriend = friendCalc.filter(function (dif) {
        return dif.totalDiff == maxScore;
    });

    res.json(pickedFriend);
    friendsList.push(newSurvey);

});

router.get('/api/friends', function (req, res) {
    res.json(friendsList);
});

module.exports = router;