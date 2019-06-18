import React, { Component } from 'react';
import './Style.css';

export default class PlaylistsScreen extends Component{

    sortPlayists(){
      return this.props.data.sort((a,b) => {
        return b.tracks.length - a.tracks.length;
      });
    }

    render(){
        return(
            <div>
            <div className="style">
              <h1 className="playlist">Playlists</h1>
              <h3 className="refresh" onClick={() => { this.props.loading(false, null)}}>Refresh</h3>
            </div>
            <div className="style">
              {this.sortPlayists().map((item, i) =>
                <div key={i} align="center">
                  <img className="pimg" src={item.img} alt="Playlist"
                       onClick={() => { this.props.handler(item, true) }}></img>
                  <h3>{item.name}</h3>
                  <h4>{item.score}% Match</h4>
                </div>
              )}
            </div>
          </div>
        );
    }
}