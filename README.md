This app is a node.js based app, that the user inputs four simple commands and gets back break downs of songs, movies, and twitter info. The basic command line is "node liri.js command-here* "user-input" ".

The 1st command, "my-tweets", sends an API request to Twitter and pull all of the tweets off of my Twitter page.

The second command is "spotify-this-song", which sends an API request to Spotify and retrives the artist, album, and a link to a preview of the song. As of now, the app only accepts one word strings or strings that are wrapped in "" for this function.

The third command is "movie-this", which sends an API request to OMDB and returns the title, year released, IMDB rating, country produced, language, plot, and main actors in the movie.

The fourth command, "do-what-it-says", calls the spotify-this-song function. However, it pulls the data on a .txt file and feeds it to the function.