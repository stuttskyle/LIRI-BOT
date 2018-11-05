////read and rquire dotenv package
require("dotenv").config();

//import keys
const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const Twitter = require("twitter");
const request = require("request"); 
const fs = require("fs");

//Key initilization
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

let nodeCommand = process.argv[3];
let userCommand = process.argv[2];

//Spotify Search Function
function songSearch(song){
    if(!song){
        const defSong = "The Sign";
    } else {
        defSong = song
    }
    spotify.search({type: 'track', query: defSong, limit: '1'}, function(err, data) {
        if(err){
            console.log(err);
        }
        let artist = data.tracks.items[0].album.artist[0].name;
        let songName = data.tracks.items[0].name;
        let album = data.tracks.items[0].album.name;
        let release = data.tracks.items[0].album.release_date;

        console.log("Artist" + artist);
        // console.log("Song Name" = songName);
        console.log("Album" + album);
        console.log("Release Date" + release);
    });
};

//Twitter Search(in progress)
function twitSearch(userName) {
    const count = 0;
    const params = {screen_name: userName};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if (!error){
            tweets.forEach(function(stuff){
                if (count < 20){
                    count++;
                    console.log(stuff.text);
                    console.log(stuff.created_at);
                    console.log(`\n`);
                } else {
                    // Come Back to this
                }
            })
        } else {
            console.log(error);
        }
    });
    count = 0;
};

//IMDB Search
function movieSearch(movie){
    if(!movie){
        var movieName = "Mr. Nobody";
    } else{
        movieName = movie;
    }
    let queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(err, response, body){

        if(!err && response.statusCode === 200){
            console.log("Movie title: " + JSON.parse(body).Title);
            console.log("Release date: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            if(JSON.parse(body).Ratings[1]){
                console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[1].Value);
            }
            console.log("Produced in " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        } else{
            console.log(err);
        }
    });
};

// Do What It Says
doIt = () => {
    fs.readFile("random.txt", "utf8", (err, data) => {
        if (err) {
            console.log(err);
        }
        let dataArr = data.split(",");
        getSpotify(dataArr[1]);

    });
};

getCommands = (command, nodeCommand) => {
    switch (command) {
        case "my-tweets":
            twitSearch();
            break;

        case "spotify-this-song":
            if (nodeCommand === undefined) {
                nodeCommand = "The Sign, Ace of Base";
            };

            songSearch(nodeCommand);
            break;

        case "movie-this":
            movieSearch();
            break;

        case "do-what-it-says":
            doIt();
            break;

    };
};



getCommands(userCommand, nodeCommand);