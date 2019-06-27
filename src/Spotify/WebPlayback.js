import React, { Component, Fragment } from 'react';
import _ from 'lodash';

import SpotifyUtils from './Utils.js';
const utils = new SpotifyUtils();

export default class WebPlayback extends Component {
  deviceSelectedInterval = null
  statePollingInterval = null
  webPlaybackInstance = null

  state = {
    playerReady: false,
    playerSelected: false,
    skipped: [],
    userId: null,
  }

  async handleState(state) {
    if (state) {
      this.props.onPlayerStateChange(state);
    } else {
      let {
        _options: { id: device_id }
      } = this.webPlaybackInstance;

      this.clearStatePolling();
      this.props.onPlayerWaitingForDevice({ device_id: device_id });
      await this.waitForDeviceToBeSelected();
      this.props.onPlayerDeviceSelected();
    }
  }

  waitForSpotify() {
    return new Promise(resolve => {
      if ('Spotify' in window) {
        resolve();
      } else {
        window.onSpotifyWebPlaybackSDKReady = () => { resolve(); };
      }
    });
  }

  waitForDeviceToBeSelected() {
    return new Promise(resolve => {
      this.deviceSelectedInterval = setInterval(() => {
        if (this.webPlaybackInstance) {
          this.webPlaybackInstance.getCurrentState().then(state => {
            if (state !== null) {
              this.startStatePolling();
              clearInterval(this.deviceSelectedInterval);
              resolve(state);
            }
          });
        }
      });
    });
  }

  startStatePolling() {
    this.statePollingInterval = setInterval(async () => {
      let state = await this.webPlaybackInstance.getCurrentState();
      await this.handleState(state);
    }, this.props.playerRefreshRateMs || 1000);
  }

  clearStatePolling() {
    clearInterval(this.statePollingInterval);
  }

  async setupWebPlaybackEvents() {
    let { Player } = window.Spotify;

    this.webPlaybackInstance = new Player({
      name: this.props.playerName,
      volume: this.props.playerInitialVolume,
      getOAuthToken: async callback => {
        if (typeof this.props.onPlayerRequestAccessToken !== "undefined") {
          let userAccessToken = await this.props.onPlayerRequestAccessToken();
          utils.getUserId(userAccessToken)
            .then((id) => {
              this.setState({ userId: id });
            });
          callback(userAccessToken);
        }
      }
    });

    this.webPlaybackInstance.on("initialization_error", e => {
      this.props.onPlayerError(e.message);
    });

    this.webPlaybackInstance.on("authentication_error", e => {
      this.props.onPlayerError(e.message);
    });

    this.webPlaybackInstance.on("account_error", e => {
      this.props.onPlayerError(e.message);
    });

    this.webPlaybackInstance.on("playback_error", e => {
      this.props.onPlayerError(e.message);
    });

    this.webPlaybackInstance.on("player_state_changed", state => {
      if (this.state.skipped.length < 2) {
        this.state.skipped.push(state);
      } else {
        if (state.position === 0 && this.state.skipped[1].position !== 0) {
          if (!_.isEqual(this.state.skipped[1].track_window.current_track,
            state.track_window.current_track)) {
              utils.rateTrack(
                this.state.skipped[1].position, 
                this.state.skipped[1].duration, 
                this.state.skipped[0].track_window.current_track.id, 
                this.state.userId);

          }

        }
      }
      this.state.skipped.shift();
      this.state.skipped.push(state);
    });

    this.webPlaybackInstance.on("ready", data => {
      utils.setPlayer(data.device_id);
      this.props.onPlayerWaitingForDevice(data);
    });

    if (this.props.playerAutoConnect) {
      this.webPlaybackInstance.connect();
    }
  }

  setupWaitingForDevice() {
    return new Promise(resolve => {
      this.webPlaybackInstance.on("ready", data => {
        resolve(data);
      });
    });
  }

  async componentWillMount() {
    // Notify the player is loading
    this.props.onPlayerLoading();

    // Wait for Spotify to load player
    await this.waitForSpotify();

    // Setup the instance and the callbacks
    await this.setupWebPlaybackEvents();

    // Wait for device to be ready
    let device_data = await this.setupWaitingForDevice();
    this.props.onPlayerWaitingForDevice(device_data);

    // Wait for device to be selected
    await this.waitForDeviceToBeSelected();
    this.props.onPlayerDeviceSelected();
  }

  render() {
    return (<Fragment>{this.props.children}</Fragment>);
  }
};