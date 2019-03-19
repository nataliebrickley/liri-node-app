require("dotenv").config();
var Spotify = require("node-spotify-api")
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
var fs = require("fs")

//create a function called liri that will...
function liri(){
//check to see what kind of request is being made:
switch (process.argv[2]) {
    //if we want a concert: 
    case "concert-this":
        //get the artists full name:
        var artist = "";
        for (i = 3; i < process.argv.length; i++) {
            artist += process.argv[i];
        }
        //generate our query url:
        var bandsInTownURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        //make our api request:
        axios.get(bandsInTownURL).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
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
    //if no song was entered, default to "The Sign" by Ace of Base
    if (process.argv.length === 3) {
        var song = "The Sign, Ace of Base"
        console.log(song)
    }
    else {
        //else, get the songs full name
        song = process.argv[3];
        for (i = 4; i < process.argv.length; i++) {
            song += "%20" + process.argv[i];
        }
    }
            //get info for the song that was entered
            var spotify = new Spotify(keys.spotify)
            spotify.search({
                type: "track",
                query: song
            }).then(function (response) {
                var data = response.tracks.items[0]
                //console.log(data)
                var artists = "Artists: " + data.artists[0].name;
                var songName = ", Song: " + data.name;
                var preview = ", Preview Link: " + data.preview_url;
                var album = ", Album: " + data.album.name;
                console.log(artists, songName, preview, album)
            })
        break;

        //if we want a movie:
        case "movie-this":
        if (process.argv.length === 3) {
            var movie = "Mr. Nobody"
        }
        else {
            //else, get the full movie name
            movie = process.argv[3];
            for (i = 4; i < process.argv.length; i++) {
                movie += "+" + process.argv[i];
            }
        }
        //get info for the movie that was entered
        var omdbURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie
        axios.get(omdbURL).then(function(response){
            var title = "Title: " + response.data.Title;
            var year = "Year: " + response.data.Year;
            var IMDB = "IMDB Rating: " + response.data.Ratings[0].Value;
            var rottenTomatoes = "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value;
            var country = "Country: " + response.data.Country;
            var language = "Language: " + response.data.Language;
            var plot = "Plot: " + response.data.Plot;
            var actors = "Actors: " + response.data.Actors;
            console.log(title, "\n", year, "\n", IMDB, "\n", rottenTomatoes, "\n", country, "\n", language, "\n", plot, "\n", actors)
        })
        break;

        case "do-what-it-says": 
        //Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands. It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.Edit the text in random.txt to test out the feature for movie-this and concert-this.
        fs.readFile("random.txt", "utf8", function(error, data) {
            if(error) {
                console.log(error);
            }
            else {
                console.log(data.split(","));
                var array = data.split(",");
                process.argv[2] = array[0];
                process.argv[3] = array[1]
                liri()
            }
        })


}
}
liri();

//ISSUES:
//concert api: how many listings should i log?
//spotify: