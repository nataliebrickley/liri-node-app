require("dotenv").config();
require("node-spotify-api")
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
}