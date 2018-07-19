// require("dotenv").config();

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var userCommand = process.argv[2];

console.log(userCommand);

if(userCommand === "my-tweets"){

    // This will show your last 20 tweets and when they were created at in your terminal/bash window.
}

if (userCommand === "spotify-this-song") {
    var songTitle = process.argv.slice(3).join(" ");
    console.log(songTitle);
}