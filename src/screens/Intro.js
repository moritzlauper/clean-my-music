import React, { Component, Fragment } from 'react';
import Login from '../Spotify/Login.js';

export default class IntroScreen extends Component {
  buttonClick(e) {
    e.preventDefault();
    Login.logInWithSpotify();
  }

  render() {
    return (
      <Fragment>
        <p>This app arranges your playlists in an order, wich is based on your impression of each track in it.</p>
        
        <button className="btn btn-md btn-violet" onClick={this.buttonClick}>Log in with Spotify</button>
        &nbsp;
      </Fragment>
    );
  };
}