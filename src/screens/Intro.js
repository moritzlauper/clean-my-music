import React, { Component, Fragment } from 'react';
import Login from '../Spotify/Login.js';
import './Style.css';
import Header from '../layout/Header.js';
import Footer from '../layout/Footer.js';

export default class IntroScreen extends Component {
  buttonClick(e) {
    e.preventDefault();
    Login.logInWithSpotify();
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <div className="style" >
          <p>This app keeps you far away from messy Spotify playlists.</p> 
          <p>It rates each track you listen to and evaluates how clean your playlists are.</p>
            <p>The app suggests you the songs which you should remove to have neat playlists.</p>
            <br/>
          <h3 onClick={this.buttonClick} style={{cursor:'pointer'}}>Log in with Spotify</h3>
          &nbsp;
        </div>
        <Footer/>
      </Fragment>
    );
  };
}