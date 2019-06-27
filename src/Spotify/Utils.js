import Spotify from 'spotify-web-api-js';

const spotifyApi = new Spotify();
const apiUri = 'https://cleanmymusic.herokuapp.com/';

const noData = [{ type: "noData" }];
let user_name = null;
let spotifyUserData = [];

export default class SpotifyUtils {

    async getUserId(token) {
        spotifyApi.setAccessToken(token);
        return spotifyApi.getMe().then((response) => {
            return response.id;
        });
    }

    async setPlayer(device_id){
        spotifyApi.getMyCurrentPlaybackState()
        .then((data) => {
            let active = data.is_playing === true ? true : false;
            console.log(active);
            spotifyApi.transferMyPlayback([device_id], {play : active}); 
        });
    }

    async rateTrack(position, duration, trackId, userId) {
        return await fetch(apiUri + position + "/" + duration + "/" + trackId + "/" + userId);
    }

    deleteTrack(playlistId, trackId) {
        let uri = [];
        uri.push("spotify:track:" + trackId);
        spotifyApi.removeTracksFromPlaylist(playlistId, uri);
    }

    handleTopPlaylist(token) {
        this.getUserId(token).then((id) => {
            fetch(apiUri + "user/" + id)
                .then(response => response.json())
                .then((data) => {
                    let topTracks = this.getTopTracks(data);
                    let avgCount = data.filter((track) => { return track.id_track === "average" });
                    let cleanedTracksPlaylist = spotifyUserData.find(playlist => {
                        return playlist.name === "Cleaned Music - Your Top Tracks"
                    });
                    if (topTracks.length === 20 && avgCount.pop().count >= 100) {
                        if (topTracks !== cleanedTracksPlaylist) {
                            if (typeof cleanedTracksPlaylist === 'undefined') {
                                spotifyApi.createPlaylist(id, {
                                    name: 'Cleaned Music - Your Top Tracks',
                                    description: 'Your current 20 favorite tracks -Brought to you by Moritz Lauper.'
                                }).then((res) => {
                                    spotifyApi.addTracksToPlaylist(res.id, topTracks.map(t => "spotify:track:" + t.id_track));
                                });
                            } else {
                                spotifyApi.removeTracksFromPlaylist(cleanedTracksPlaylist.id, cleanedTracksPlaylist.tracks.map(t => "spotify:track:" + t.id))
                                    .then(() => {
                                        spotifyApi.addTracksToPlaylist(cleanedTracksPlaylist.id, topTracks.map(t => "spotify:track:" + t.id_track));
                                    });
                            }
                        }
                    } else if (typeof cleanedTracksPlaylist !== 'undefined') {
                        spotifyApi.removeTracksFromPlaylist(cleanedTracksPlaylist.id, cleanedTracksPlaylist.tracks.map(t => "spotify:track:" + t.id))
                    }
                });
        });
    }

    getTopTracks(list) {
        let sorted = list.sort((a, b) => {
            return (b.score + (b.skippedCount * 2)) - (a.score + (a.skippedCount * 2));
        });
        sorted = sorted.filter((val) => { return val.id_track !== "average" });
        if (sorted.length >= 20) {
            sorted = sorted.slice(0, 20);
        }
        return sorted;
    }

    async getData(token, reactCallback) {
        this.getUserId(token).then((id) => {
            user_name = id;
            this.getSpotifyData((spotifyData, callback) => {
                fetch(apiUri + "user/" + id)
                    .then(response => response.json())
                    .then((data) => {
                        spotifyUserData = spotifyData;
                        callback(this.calculate(spotifyData, data));
                    });
            }, reactCallback);
        });
    }

    async getSpotifyData(doneCallback, reactCallback) {
        return spotifyApi.getUserPlaylists().then(playlists => {
            //users and followed playlists
            //this.recursiveCall(playlists.items, [], doneCallback, reactCallback)

            //Only users playlists

            let usersPlaylists = playlists.items.filter(playlist => {
                return playlist.owner.display_name === user_name;
            });
            if (typeof usersPlaylists !== 'undefined') {
                this.recursiveCall(usersPlaylists, [], doneCallback, reactCallback);
            } else {
                doneCallback(noData, reactCallback);
            }

        }).catch(err => {
            console.log(err);
            doneCallback(noData, reactCallback);
        });
    }

    async recursiveCall(playlists, userPlaylists, doneCallback, reactCallback) {
        let playlistTracks = [];
        let playlist = playlists.pop();
        spotifyApi.getPlaylistTracks(playlist.id, { fields: "items(track(name,id,album(images())))" }).then(tracks => {
            tracks.items.forEach((track) => {
                if (track.track.album.images[1] !== undefined) {
                    playlistTracks.push({ id: track.track.id, name: track.track.name, img: track.track.album.images[1].url });
                }
            });
            let imageUri = typeof playlist.images[0] !== 'undefined' ? playlist.images[0].url : undefined;
            userPlaylists.push({ name: playlist.name, id: playlist.id, img: imageUri, tracks: playlistTracks });
            if (playlists.length > 0) {
                this.recursiveCall(playlists, userPlaylists, doneCallback, reactCallback);
            } else {
                doneCallback(userPlaylists, reactCallback);
            }
        });
    }

    calculate(playlists, scores) {
        scores = scores.filter((element) => {
            return element.skippedCount >= 2;
        });

        if (scores.length === 0) {
            return noData;
        }
        let userData = [];
        playlists.forEach((playlist) => {
            if (playlist.name !== "Cleaned Music - Your Top Tracks") {
                let playlistTracks = [];
                scores.forEach((score) => {
                    let current = playlist.tracks.find(track => {
                        return track.id === score.id_track;
                    });
                    if (current !== undefined) {
                        playlistTracks.push({ current, score: Math.round((score.score) * 100) / 100 });
                    }
                });
                if (playlistTracks.length > 0) {
                    let playlistScore = 0;

                    playlistTracks.forEach(track => {
                        playlistScore += track.score;
                    });
                    userData.push({
                        name: playlist.name,
                        id: playlist.id,
                        img: playlist.img,
                        score: Math.round((playlistScore / playlistTracks.length) * 100) / 100,
                        tracks: playlistTracks
                    });
                }
            }
        });
        return userData;
    }
}