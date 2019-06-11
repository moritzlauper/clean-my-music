import Spotify from 'spotify-web-api-js';

const spotifyApi = new Spotify();
const apiUri = 'http://localhost:5000/';

let user_name = null;

export default class SpotifyUtils {

    async getUserId(token) {
        spotifyApi.setAccessToken(token);
        return spotifyApi.getMe().then((response) => {
            return response.id;
        }); 
    }

    rateTrack(position, duration, trackId, userId) {
        fetch(apiUri + position + "/" + duration + "/" + trackId + "/" + userId);
    }

    async getData(token, reactCallback) {
         this.getUserId(token).then((id) => {
            user_name = id;
            this.getSpotifyData((spotifyData, callback) => {
                fetch(apiUri + "user/" + id)
                .then(response => response.json())
                .then((data) => {
                    callback(this.calculate(spotifyData, data));
                })
            }, reactCallback);
        });
    }

    async getSpotifyData(doneCallback, reactCallback) {
        return spotifyApi.getUserPlaylists().then(playlists => {
            this.recursiveCall(playlists.items, [], doneCallback, reactCallback);
        });
    }

    async recursiveCall(playlists, userPlaylists, doneCallback, reactCallback) {
        let playlistTracks = [];
        let playlist = playlists.pop();
        spotifyApi.getPlaylistTracks(playlist.id, { fields: "items(track(name,id,album(images())))" }).then(tracks => {
            if(playlist.owner.display_name === user_name){
            tracks.items.forEach((track) => {
                if(track.track.album.images[1] !== undefined){
                    playlistTracks.push({id: track.track.id, name: track.track.name, img: track.track.album.images[1].url});
                }
            });
            }
            userPlaylists.push({name: playlist.name, id: playlist.id, img: playlist.images[0].url, tracks: playlistTracks});
            if (playlists.length > 0) {
                this.recursiveCall(playlists, userPlaylists, doneCallback, reactCallback);
            } else {
                doneCallback(userPlaylists, reactCallback);
            }
        });
    }

    calculate(playlists, scores){   
        let userData = [];
        playlists.forEach((playlist) => {
            let playlistTracks = [];
            scores.forEach((score) => {
                let current = playlist.tracks.find(track => {
                    return track.id === score.id_track;
                });
                if(current !== undefined){
                    playlistTracks.push({current, score : score.score});
                }
            });
                if(playlistTracks.length > 0){
                    let playlistScore = 0;

                    playlistTracks.forEach(track => {
                        playlistScore += track.score;
                    });
                    userData.push({
                        name: playlist.name, 
                        id: playlist.id, 
                        img: playlist.img, 
                        score: Math.round((playlistScore / playlistTracks.length) * 100) / 100, 
                        tracks: playlistTracks});
                }
        });
        return userData;
    }
}