import React, { Component, Fragment } from 'react';

import './Style.css';
import Playlists from './Playlists.js'
import Tracks from './PlaylistTracks.js';
import Loading from './Loading.js';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.handler = this.handler.bind(this);
    this.loading = this.loading.bind(this);
  }
  state = {
    selectedPlaylist: [],
    isSelected: false,
    loaded: false,
    data: []
  }

  handler(playlist, bool) {
    this.setState({
      selectedPlaylist: playlist,
      isSelected: bool
    });
  } 

  loading(loaded, data){
    this.setState({
      loaded: loaded,
      data : data
    })
  }

  render() {
    return (
      <Fragment>
        {!this.state.loaded && <Loading token={this.props.token} loading={this.loading}/>}

        {!this.state.isSelected &&
          this.state.loaded &&
          <Playlists
            handler={this.handler}
            loading={this.loading}
            data={this.state.data}
          />}

        {this.state.isSelected &&
          this.state.loaded &&
          <Tracks
            playlist={this.state.selectedPlaylist}
            handler={this.handler}
          />}
      </Fragment>
    );
  };
}