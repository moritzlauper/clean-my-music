import React, { Component, Fragment } from 'react';
import './Style.css';
import Playlists from './Playlists.js'
import Tracks from './PlaylistTracks.js';
import Loading from './Loading.js';
import SpotifyUtils from '../Spotify/Utils.js';

const utils = new SpotifyUtils();

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.handler = this.handler.bind(this);
  }
  state = {
    selectedPlaylist: {
      tracks: [],
      name: null
    },
    loaded: false,
    data: []
  }

  handler(tracks, name) {
    this.setState({
      selectedPlaylist: {
        tracks: tracks,
        name: name,
      }
    });
  } 

  load() {
    if (!this.state.loaded) {

      utils.getData(this.props.token, (list) => {
        this.setState({loaded: true, data: list});
      });
    }
  }

  render() {
    return (
      <Fragment>
        {!this.state.loaded && <Loading/>}
        {!this.state.loaded && this.load()}

        {this.state.selectedPlaylist.name === null &&
          this.state.loaded &&
          <Playlists
            handler={this.handler}
            data={this.state.data}
          />}

        {this.state.selectedPlaylist.name !== null &&
          this.state.loaded &&
          <Tracks
            playlistTracks={this.state.selectedPlaylist.tracks}
            playlistName={this.state.selectedPlaylist.name}
            handler={this.handler}
          />}
      </Fragment>
    );
  };
}