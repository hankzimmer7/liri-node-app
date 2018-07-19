//Import required packages
require("dotenv").config();
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var fs = require("fs");

//Get keys using keys.js
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Variables to store the user inputs
var userCommand = process.argv[2];
var userTerm = process.argv.slice(3).join(" ")

//Variable to store the information LIRI retrieves
var resultsInfo = "";

//Function to append information to the log.txt
function writeToLog(data) {
    var divider = "\n-------------------------------------------\n";

    //Append the data to the log.txt file
    fs.appendFile("log.txt", "\nCommand run: " + userCommand + " " + userTerm + "\n" + data + divider, function (err) {
        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        }
        // Otherwise, it will print: "log.txt was updated!"
        console.log("log.txt was updated!");
    });
}

//If the user used the "do-what-it-says" command
if (userCommand === "do-what-it-says") {

    //Read the random.txt file and execute its command
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // Split the data by commas to get each command
        var dataArray = data.split(",");

        //Set the command terms based on the data within log.txt
        userCommand = dataArray[0];
        userTerm = dataArray[1];

        console.log("\nRandom.txt says: " + data + "\nExecuting command.");

        executeCommand();
    });
} else {
    executeCommand();
}

// Function to execute the desired commands
function executeCommand() {

    //If the user entered the "my-tweets" command
    if (userCommand === "my-tweets") {
        // This will show your last 20 tweets and when they were created at in your terminal/bash window.
        var params = {
            screen_name: 'realDonaldTrump'
        };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (error) {
                return console.log('Error occurred: ' + error);
            }

            for (var i = 0; i < 20; i++) {
                resultsInfo = resultsInfo.concat("\nTweet " + i + ": " + tweets[i].text + "\nCreated " + tweets[i].created_at + "\n");
            }
            console.log(resultsInfo);
            writeToLog(resultsInfo);
        });
    }

    //If the user entered the "spotify-this-song-command"
    else if (userCommand === "spotify-this-song") {
        var songTitle = userTerm;

        //The default song is The Sign by Ace of Base
        if (!songTitle) {
            songTitle = "The Sign Ace of Base";
        }

        spotify.search({
            type: 'track',
            query: songTitle
        }, function (error, data) {
            if (error) {
                return console.log('Error occurred: ' + err);
            }

            var songInfo = data.tracks.items[1];

            resultsInfo = "\nArtist(s): " + songInfo.artists[0].name +
                "\nSong Title: " + songInfo.name +
                "\nAlbum: " + songInfo.album.name +
                "\nFull Track Link: " + songInfo.external_urls.spotify +
                "\nPreview Link: " + songInfo.preview_url + "\n";

            console.log(resultsInfo);
            writeToLog(resultsInfo);
        });

    }

    //If the user used the "movie-this" command
    else if (userCommand === "movie-this") {
        //Get the movie title and use plus signs instead of spaces so it can be used in the url
        var movieTitle = userTerm;

        // The default movie is Mr Nobody
        if (!movieTitle) {
            movieTitle = "Mr Nobody";
        }

        // Then run a request to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function (error, response, body) {

            // If the request is successful
            if (!error && response.statusCode === 200) {
                resultsInfo = "\nMovie Title: " + JSON.parse(body).Title +
                    "\nRelease Year: " + JSON.parse(body).Year +
                    "\nIMDB Rating: " + JSON.parse(body).imdbRating +
                    "\nRotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
                    "\nCountry: " + JSON.parse(body).Country +
                    "\nLanguage: " + JSON.parse(body).Language +
                    "\nPlot: " + JSON.parse(body).Plot +
                    "\nActors: " + JSON.parse(body).Actors + "\n";

                console.log(resultsInfo);
                writeToLog(resultsInfo);
            }
        });
    }
}