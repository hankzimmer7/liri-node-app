require("dotenv").config();
var Twitter = require('twitter');
var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var userCommand = process.argv[2];
console.log("User Command is: " + userCommand);

if (userCommand === "my-tweets") {

    // This will show your last 20 tweets and when they were created at in your terminal/bash window.

    var params = {
        screen_name: 'realDonaldTrump'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < 20; i++) {
                console.log("\nTweet " + i + ": " + tweets[i].text);
                console.log("Created " + tweets[i].created_at);
            }
        }
    });
}

if (userCommand === "spotify-this-song") {
    var songTitle = process.argv.slice(3).join(" ");
    console.log(songTitle);
}
if (userCommand === "movie-this") {
    var movieTitle = process.argv.slice(3).join(" ");
    console.log(movieTitle);
}