import React, { Component, Fragment } from 'react';
import './Style.css';

export default class PlaylistTracksScreen extends Component {

    removeTrack(i){
        document.getElementById(i).style.display = "none"; 
    }

    render() {
        return (
            <Fragment>
                <div className="style">
                    <h1>{this.props.playlistName}</h1>
                </div>
                <div className="style">
                    {this.props.playlistTracks.map((item, i) => 
                        <div id={item.current.id} key={i} align="center">
                            <img className="timg" src={item.current.img} alt="Track"
                            onClick={() => {this.removeTrack(item.current.id)}}></img>
                            <h3>{item.current.name}</h3>
                            <h4>{item.score}% Match</h4>
                        </div>
                    )}
                </div>
                <div className="style">
                    <h1 onClick={() => { this.props.handler(null, null) }}>Back</h1>
                </div>
            </Fragment>
        );
    };
}