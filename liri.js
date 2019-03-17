require("dotenv").config();
require("node-spotify-api")
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");

//var spotify = new Spotify(keys.spotify);

switch (process.argv[2]) {
    case "concert-this":
        var artist = process.argv[3];
        var bandsInTownURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios.get(bandsInTownURL).then(function(response){
            console.log(bandsInTownURL)
        })
}