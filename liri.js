require("dotenv").config();
var Spotify = require("node-spotify-api")
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
//var spotify = new Spotify(keys.spotify);

//check to see what kind of request is being made:
switch (process.argv[2]) {
    //if we want a concert: 
    case "concert-this":
        //get the artists full name:
        var artist = "";
        for (i=3; i<process.argv.length; i++) {
            artist += process.argv[i];
        }
        //generate our query url:
        var bandsInTownURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        //make our api request:
        axios.get(bandsInTownURL).then(function(response){
            for(var i=0; i<response.data.length; i++) {
                //get the venue
                var venue = "Venue: " + response.data[i].venue.name;
                //get the location
                var location = "Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.region;
                //get the date and format it with moment.js
                var formatDate = moment(response.data[i].datetime).format("MM/DD/YYYY")
                var date = "Date: " + formatDate;
                //log the results
                console.log(venue, location, date)
            }
        })
        break;

        //if we want a song:
        case "spotify-this-song":
            //get the songs full name
            var song = "";
            for (i=3; i<process.argv.length; i++) {
                song += process.argv[i];
            }
            var spotify = new Spotify(keys.spotify)
            spotify.search({
                type: "track",
                query: song
            }).then(function(response) {
                var data = response.tracks.items[0]
                //console.log(response.tracks.items[0])
                var artists = "Artists: " + data.artists[0].name;
                var songName = ", Song: " + data.name;
                var preview = ", Preview Link: " + data.preview_url;
                var album = ", Album: " + data.name;
                console.log(artists, songName, preview, album)
            })
    


}


//ISSUES:
//concert api: how many listings should i log?
//spotify: artists sometimes doesnt work...get cannot read property artists of undefined