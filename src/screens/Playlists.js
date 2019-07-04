import React, { Component } from 'react';
import './Style.css';
import SpotifyUtils from '../Spotify/Utils';

const utils = new SpotifyUtils();

export default class PlaylistsScreen extends Component{

    sortPlayists(){
      return this.props.data.sort((a,b) => {
        return b.tracks.length - a.tracks.length;
      });
    }
    
  selectPlayer(){
    utils.setPlayer();
    document.getElementById("select").style.display = "none";
  }

    render(){
        return(
            <div>
            <div className="style">
            <p id="select" style={{cursor:'pointer'}} onClick={() => {this.selectPlayer()}}><u>SELECT DEVICE</u></p>
              <h1 className="playlist">Playlists</h1>
              <h3 className="refresh" style={{cursor:'pointer'}} onClick={() => { this.props.loading(false, null)}}>Refresh</h3>
            </div>
            <div className="style">
              {this.sortPlayists().map((item, i) =>
                <div key={i} align="center">
                  <img className="pimg" src={item.img} alt="Playlist" style={{cursor:'pointer'}}
                       onClick={() => { this.props.handler(item, true) }}></img>
                  <h2>{item.name}</h2>
                  <h4>{item.score}% cleaned</h4>
                </div>
              )}
            </div>
          </div>
        );
    }
}