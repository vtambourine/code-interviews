import './FollowButton.styl';

import React from 'react';
import cx from 'react/lib/cx';

var FollowButton = React.createClass({
    getInitialState() {
        return {
            isFollowed: this.props.isFollowed,
            label: this.props.isFollowed ? 'Unfollow' : 'Follow'
        };
    },

    render() {
        return (
            /* jshint ignore:start */
            <div
                className={cx({
                    FollowButton: true,
                    _followed: this.state.isFollowed
                })}
                onClick={this._onClick}>
                <span className="FollowButton__label">{this.state.isFollowed ? 'Unfollow' : 'Follow'}</span>
            </div>
            /* jshint ignore:end */
        );
    },

    _onClick() {
        this.setState({
            isFollowed: !this.state.isFollowed
        });
    }
});

module.exports = FollowButton;
