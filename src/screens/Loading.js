import React, { Component, Fragment } from 'react';
import './Style.css';

import SpotifyUtils from '../Spotify/Utils.js';

const utils = new SpotifyUtils();

export default class Loading extends Component {

    loadData() {
        utils.getData(this.props.token, (list) => {
            if (list.length > 0) {
                if (list[0].type !== "noData") {
                    this.props.loading(true, list, false);
                    utils.handleTopPlaylist(this.props.token);
                } else {
                    this.props.loading(true, null, true);
                }
            } else {
                this.props.loading(true, null, true);
            }
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