import React, { Component } from 'react';
import WebPlayback from './Spotify/WebPlayback.js';
import './App.css';

import LoginCallback from './Spotify/LoginCallback.js';

import IntroScreen from './screens/Intro.js';
import HomeScreen from './screens/Home.js';

window.onSpotifyWebPlaybackSDKReady = () => { };

export default class App extends Component {

  state = {
    // User's session credentials
    userDeviceId: null,
    userAccessToken: null,

    // Player state
    playerLoaded: false,
    playerSelected: false,
    playerState: null,
  }

  componentWillMount() {
    LoginCallback({
      onSuccessfulAuthorization: this.onSuccessfulAuthorization.bind(this),
      onAccessTokenExpiration: this.onAccessTokenExpiration.bind(this)
    });
  }

  onSuccessfulAuthorization(accessToken) {
    this.setState({
      userAccessToken: accessToken
    });
  }

  onAccessTokenExpiration() {
    this.setState({
      userDeviceId: null,
      userAccessToken: null,
      playerLoaded: false,
      playerSelected: false,
      playerState: null,
    });

    console.error("The user access token has expired.");
  }

  render() {
    let {
      userAccessToken,
      playerLoaded,
    } = this.state;

    let webPlaybackSdkProps = {
      playerName: "CleanMyMusic",
      playerInitialVolume: 0.5,
      playerRefreshRateMs: 10,
      playerAutoConnect: true,
      onPlayerRequestAccessToken: (() => userAccessToken),
      onPlayerLoading: (() => this.setState({ playerLoaded: true })),
      onPlayerWaitingForDevice: (data => this.setState({ playerSelected: false, userDeviceId: data.device_id })),
      onPlayerDeviceSelected: (() => this.setState({ playerSelected: true })),
      onPlayerStateChange: (playerState => this.setState({ playerState: playerState })),
      onPlayerError: (playerError => console.error(playerError))
    };

    return (
      <div className="App" id="content-wrap">
        <main>
          {!userAccessToken &&
            <IntroScreen />}

          {userAccessToken &&
            <WebPlayback {...webPlaybackSdkProps}>

              {playerLoaded &&
                <HomeScreen token={userAccessToken}/>
              }
            </WebPlayback>
          }
        </main>        
      </div>
    );
  }
};
