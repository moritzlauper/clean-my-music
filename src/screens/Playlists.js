import React, { Component } from 'react';
import './Style.css';

export default class PlaylistsScreen extends Component{

    render(){
        return(
            <div>
            <div className="style">
              <h1>Playlists</h1>
            </div>
            <div className="style">
              {this.props.data.map((item, i) =>
                <div key={i} align="center">
                  <img className="pimg" src={item.img} alt="Playlist"
                       onClick={() => { this.props.handler(item.tracks, item.name) }}></img>
                  <h3>{item.name}</h3>
                  <h4>{item.score}% Match</h4>
                </div>
              )}
            </div>
          </div>
        );
    }
}