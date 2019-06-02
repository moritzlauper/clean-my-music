import React, { Component, Fragment } from 'react';
import './Style.css';
import Playlists from './Playlists.js'
import Tracks from './PlaylistTracks.js';
import Loading from './Loading.js';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.handler = this.handler.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }
  state = {
    selectedPlaylist: {
      id : null,
      name : null
    },
    loading: true
  }

  handler(id, name) {
    this.setState({
      selectedPlaylist: {
        id : id,
        name : name,
      } 
    });
  }

  isLoading() {
    this.setState({
      loading : false
    });
  }

  render() {
    return (
      <Fragment> 
        {this.state.loading &&
        <Loading isLoading={this.isLoading}/>}

        {this.state.selectedPlaylist.id == null &&
        !this.state.loading &&
          <Playlists
            handler={this.handler}
            token={this.props.token}
          />}

        {this.state.selectedPlaylist.id != null &&
        !this.state.loading &&
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