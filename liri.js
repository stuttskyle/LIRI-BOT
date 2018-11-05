//Make it so liri.js can take in one of the following commands:

// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`

////read and rquire dotenv package
require("dotenv").config();

//import keys
const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const Twitter = require("twitter");
const request = require("request");
const inquirer = require("inquirer");
const fs = require("fs");

//Key initilization
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);

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
        console.log("Song Name" = songName);
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

