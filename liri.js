require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

switch (process.argv[2]) {
    case concert-this:
        var artist = process.argv[3];
        var bandsInTownURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        
}