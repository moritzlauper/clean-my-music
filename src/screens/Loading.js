import React, { Component, Fragment } from 'react';
import './Style.css';

import SpotifyUtils from '../Spotify/Utils.js';

const utils = new SpotifyUtils();

export default class Loading extends Component {

    loadData(){
        utils.getData(this.props.token, (list) => {
            this.props.loading(true, list);
          });
    }
    
    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <Fragment>
                <div className="style">
                    <h1>Loading...</h1>
                </div>
            </Fragment>
        );
    }
}