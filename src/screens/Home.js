import React, { Component, Fragment } from 'react';

export default class HomeScreen extends Component {

  render() {
    let {
      access_token
    } = this.props;

    /*let Spotify = require('spotify-web-api-js');
    let spotifyApi = new Spotify();
    spotifyApi.setAccessToken(access_token); 
    console.log(this.props.access_token);*/

    return (
      <Fragment>
        <p><strong>Your Playlists</strong></p>
      </Fragment>
    );
  };
}