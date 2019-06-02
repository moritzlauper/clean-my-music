import React, { Component, Fragment } from 'react';
import './Style.css';

export default class HomeScreen extends Component {

    render(){
        return(
            <Fragment>
                <h1 onClick={this.props.isLoading}>Loading...</h1>
            </Fragment>
        );
    }
}