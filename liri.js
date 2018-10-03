////read and rquire dotenv package
require("dotenv").config();

//import keys
const keys = require('./keys.js');
const spotify = new Spotify(keys.spotify);
const client = new Twitter(keys.twitter);