require("dotenv").config();
var request = require("request");
var Twitter = require('twitter');
var keys = require("./keys.js");

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var userCommand = process.argv[2];

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
} else if (userCommand === "spotify-this-song") {
    var songTitle = process.argv.slice(3).join(" ");
    console.log(songTitle);
} else if (userCommand === "movie-this") {
    //Get the movie title and use plus signs instead of spaces
    var movieTitle = process.argv.slice(3).join("+");

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
            console.log("\nMovie Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}