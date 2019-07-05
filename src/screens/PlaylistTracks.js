import React, { Component, Fragment } from 'react';
import './Style.css';
import SpotifyUtils from '../Spotify/Utils.js';

const utils = new SpotifyUtils();

export default class PlaylistTracksScreen extends Component {

    sortTracks(){
        return this.props.playlist.tracks.sort((a,b) => {
          return a.score - b.score;
        });
      }

    removeTrack(item){
        if(confirm("Do you want to delete this track from your Spotify Playlist?") === true){
            document.getElementById(item.id).style.display = "none"; 
            utils.deleteTrack(this.props.playlist.id, item.id);
        }
    }

    componentWillMount() {
        scroll(0, 0);
      }

    render() {
        return (
            <Fragment>
                <div className="style">
                    <h1>{this.props.playlist.name}</h1>
                </div>
                <div className="style">
                    {this.sortTracks().map((item, i) => 
                        <div id={item.current.id} key={i} align="center">
                            <img className="timg" src={item.current.img} alt="Track" style={{cursor:'pointer'}}
                            onClick={() => {this.removeTrack(item.current)}}></img>
                            <h2>{item.current.name}</h2>
                            <h4>{item.score}% Match</h4>
                        </div>
                    )}
                </div>
                <div className="style">
                    <h1 style={{cursor:'pointer'}} onClick={() => { this.props.handler([], false) }}>Back</h1>
                </div>
            </Fragment>
        );
    };
}