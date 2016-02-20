import './ShowMoreButton.styl';

import React from 'react';
import AppActions from '../../actions/AppActions';
import cx from 'react/lib/cx';

var ShowMoreButton = React.createClass({
    getInitialState() {
        return {
            hover: false
        };
    },

    render() {
        return (
            /* jshint ignore:start */
            <div
                className={cx({
                    ShowMoreButton: true,
                    hover: this.state.hover
                })}
                onClick={this._onClick}>
                Show more
            </div>
            /* jshint ignore:end */
        );
    },

    _onClick() {
        AppActions.loadData(5);
    }
});

module.exports = ShowMoreButton;
