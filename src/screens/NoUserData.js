import React, { Component } from 'react';
import './Style.css';
import availableDevices from '../assets/available_devices.png';

export default class NoUserDataScreen extends Component {

  sortPlayists() {
    return this.props.data.sort((a, b) => {
      return b.tracks.length - a.tracks.length;
    });
  }

  render() {
    return (
      <div>
        <div className="noData">
          <h1 className="playlist">Playlists</h1>
          <h3 className="refresh" style={{ cursor: 'pointer' }} onClick={() => { this.props.loading(false, null) }}>Refresh</h3>
          <p>In order to track your favorite and most unliked songs/playlists, you should listen to more music using the app.</p>
          <div className="center">
            <div className="left-center">
              <p>1. Open your Spotify app</p>
              <p>2. Go to available devices <img src={availableDevices} alt=""></img></p>
              <p>3. Select "CleanMyMusic" (should already be selected)</p>
              <p>4. Start streaming your music</p>
            </div>
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