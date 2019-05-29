import React, { Component } from 'react';
import './Style.css';
import Spotify from 'spotify-web-api-js';

const spotifyApi = new Spotify();

export default class PlaylistsScreen extends Component{
    state = {
        playlists: [{
            name: null,
            id: null,
            img: null,
            score : null
        }],
        checked: false,
    }

    getPlaylists() {
        if (!this.state.checked) {
          spotifyApi.setAccessToken(this.props.token);
          spotifyApi.getUserPlaylists({ limit: 50 })
            .then((data) => {
              let playlists = [];
              data.items.forEach(element => {
                playlists.push({ 
                name: element.name, 
                id: element.id, 
                img: element.images[0].url,
                score: "100%" });
              });
              this.setState({ playlists: playlists, checked: true });
            }, function (err) {
              console.error(err);
            });
        }
      }

    render(){
        return(
            <div>
            <div className="style">
              <h1>Playlists</h1>
            </div>
            {this.getPlaylists()}
            <div className="style">
              {this.state.playlists.map((item, i) =>
                <div key={i} align="center">
                  <img className="pimg" src={item.img} alt="Playlist"
                       onClick={() => { this.props.handler(item.id, item.name) }}></img>
                  <h3>{item.name}</h3>
                  <h4>{item.score} Match</h4>
                </div>
              )}
            </div>
          </div>
        );
    }
}