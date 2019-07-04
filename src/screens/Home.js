import React, { Component, Fragment } from 'react';

import './Style.css';
import Playlists from './Playlists.js'
import Tracks from './PlaylistTracks.js';
import Loading from './Loading.js';
import NoUserDataScreen from './NoUserData.js';

import GIF from '../assets/background.gif';
import JPG from '../assets/background.jpg';


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
    data: [],
    noData: false,

    //background
    isAnimated: false,
    text: 'animate background'
  }

  componentDidMount(){
    this.toggleBackground();
  }

  toggleBackground(){
    if(this.state.isAnimated){
    document.body.style.backgroundImage = `url(${JPG})`;
    this.setState({isAnimated : false, text: 'animate background'});
    }else{
      document.body.style.backgroundImage = `url(${GIF})`;
      this.setState({isAnimated : true, text: 'freeze background'});
    }
  }

  handler(playlist, bool) {
    this.setState({
      selectedPlaylist: playlist,
      isSelected: bool
    });
  }

  loading(loaded, data, noData) {
    this.setState({
      loaded: loaded,
      data: data,
      noData: noData
    })
  }

  render() {
    return (
      <Fragment>
        <p id="toggleBG" style={{cursor:'pointer'}} className="background-btn" onClick={() => { this.toggleBackground() }}>{this.state.text}</p>

        {!this.state.loaded && <Loading token={this.props.token} loading={this.loading} />}

        {!this.state.isSelected &&
          !this.state.noData &&
          this.state.loaded &&
          <Playlists
            handler={this.handler}
            loading={this.loading}
            data={this.state.data}
          />}

        {this.state.isSelected &&
          this.state.loaded &&
          !this.state.noData &&
          <Tracks
            playlist={this.state.selectedPlaylist}
            handler={this.handler}
          />}

        {!this.state.isSelected &&
          this.state.loaded &&
          this.state.noData &&
          <NoUserDataScreen
            handler={this.handler}
            loading={this.loading}
          />}
      </Fragment>
    );
  };
}