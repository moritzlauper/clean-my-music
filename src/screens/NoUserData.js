import React, { Component } from 'react';
import './Style.css';
import SpotifyUtils from '../Spotify/Utils';

const utils = new SpotifyUtils();

export default class NoUserDataScreen extends Component {

  state = {
    selected : false
  }

  checkPlayer(){
    utils.checkState().then(state => this.setState({selected : state}));
  }

  selectPlayer(){
    utils.setPlayer();
    document.getElementById("select").style.display = "none";
  }

  componentWillMount() {
    this.checkPlayer();
  }


  render() {
    return (
      <div>
        <div className="noData">
          <h1 className="playlist">Playlists</h1>
          <h3 className="refresh" style={{ cursor: 'pointer' }} onClick={() => { this.props.loading(false, null) }}>Refresh</h3>
          <p>In order to track your favorite and most unliked songs/playlists, you should listen to more music using the app.</p>
          <div className="center">
            {!this.state.selected && 
            <div className="left-center" id="select">
              <p>1. Resume your music on Spotify</p>
              <p style={{ cursor: 'pointer' }} onClick={() => {this.selectPlayer()}}>2. <u>SELECT DEVICE</u></p>
            </div>}
          </div>
          <br />
          <h3>Usefull features for you:</h3>
          <br />
          <p>If you use the app frequently, you will get a constantly updating Spotify playlist including your most favorite tracks.</p>
          <br />
          <p>Your most disliked tracks will be displayed directly at the top of a playlist. <br />
            Just click on the image to <b>delete them from your Spotiy playlist.</b> </p>
        </div>
      </div>
    );
  }
}