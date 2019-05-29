import React, { Component, Fragment } from 'react';
import './Style.css';
import Playlists from './Playlists.js'
import Tracks from './PlaylistTracks.js';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.handler = this.handler.bind(this)
  }
  state = {
    selectedPlaylist: {
      id : null,
      name : null
    }
  }

  handler(id, name) {
    this.setState({
      selectedPlaylist: {
        id : id,
        name : name
      } 
    });
  }

  render() {
    return (
      <Fragment>
        {this.state.selectedPlaylist.id == null &&
          <Playlists
            handler={this.handler}
            token={this.props.token}
          />}
        {this.state.selectedPlaylist.id != null &&
          <Tracks
            playlistId={this.state.selectedPlaylist.id}
            playlistName={this.state.selectedPlaylist.name}
            handler={this.handler}
            token={this.props.token}
        />}
      </Fragment>
    );
  };
}