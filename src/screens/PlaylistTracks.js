import React, { Component, Fragment } from 'react';
import './Style.css';
import Spotify from 'spotify-web-api-js';

const spotifyApi = new Spotify();

export default class PlaylistTracksScreen extends Component {
    state = {
        tracks: [{
            name: null,
            id: null,
            img: null,
            score: null,
        }],
        checked: false,
    }

    getTracks() {
        if (!this.state.checked) {
            spotifyApi.setAccessToken(this.props.token);
            spotifyApi.getPlaylistTracks(this.props.playlistId)
                .then((data) => {
                    let tracks = [];
                    data.items.forEach(element => {
                        tracks.push({
                            name: element.track.name,
                            id: element.track.id,
                            img: element.track.album.images[1].url,
                            score: "100%",
                        });
                    });
                    this.setState({ tracks: tracks, checked: true });
                });
        }
    }

    removeTrack(i){
        document.getElementById(i).style.display = "none"; 
    }

    render() {
        return (
            <Fragment>
                {this.getTracks()}
                <div className="style">
                    <h1>{this.props.playlistName}</h1>
                </div>
                <div className="style">
                    {this.state.tracks.map((item, i) => 
                        <div id={i} key={i} align="center">
                            <img className="timg" src={item.img} alt="Track"
                            onClick={() => {this.removeTrack(i)}}></img>
                            <h3>{item.name}</h3>
                            <h4>{item.score} Match</h4>
                        </div>
                    )}
                </div>
                <div className="style">
                    <h1 onClick={() => { this.props.handler(null) }}>Back</h1>
                </div>
            </Fragment>
        );
    };
}