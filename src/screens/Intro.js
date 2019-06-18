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
          <p>This app helps you to keep your playlists always 100% clean.</p> 
            <p>It recognizes when you don't like a track anymore and suggests you to remove it from your playlist.</p>
            <p>The more disliked tracks a playlist contains, the worse is its match.</p>
            <br/>
          <h3 onClick={this.buttonClick}>Log in with Spotify</h3>
          &nbsp;
        </div>
        <Footer/>
      </Fragment>
    );
  };
}