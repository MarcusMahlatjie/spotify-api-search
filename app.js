let SpotifyWebApi = require('spotify-web-api-node');            // required package for the Spotify API
let prompt = require('prompt-sync')();                          // allows us to prompt user input for song and artist name

const dotenv = require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const spotifyApi = new SpotifyWebApi ({                         // create object instance for the Spotify API
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET
});

function searchSpotify()
{
        spotifyApi.clientCredentialsGrant().then( (data) => { 
            spotifyApi.setAccessToken(data.body['access_token']);   // this uses and validates the client ID and client secret to create an access token for the session

            console.log('Welcome to the Spotify search application');
            let songName = prompt('Please enter the song name you would like to search: ');
            let artistName = prompt('Please enter the artist name you would like to search: ');

            // format the json object into the required output on the console
            spotifyApi.searchTracks(`track:${songName} artist:${artistName}`).then((searchResult) => {
                console.log(`Songs with the name ${songName} by artist ${artistName}: `);
                searchResult.body.tracks.items.forEach( (track) => {       
                    console.log(`${track.name} by ${track.artists.map(artist => artist.name).join(', ')} Album: ${track.album.name}`);      
                    console.log(`Preview song: ${track.preview_url}`);
                    console.log('');
                });
            }).catch( (error) => {
                console.log('Sorry, something went wrong: ' + error);
            });
        }).catch( (error) => {
            console.log(`Access token error`, error);            // catch any errors related to the access token
        });
};

searchSpotify();