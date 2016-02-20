import './PersonRow.styl';

import React from 'react';
import FollowButton from '../../FollowButton';

var PersonRow = React.createClass({
    render() {
        var person = this.props.person;
        return (
            /* jshint ignore:start */
            <tr className="PersonRow">
                <td>
                    <img className="PersonRow__photo"
                         src={"http://lorempixel.com/48/48/people/" + Math.floor(Math.random() * 10)}
                         width="48"
                         height="48" />
                    <div className="PersonRow__name">
                        {person.name}
                        <div className="PersonRow__follow">
                            <FollowButton isFollowed={person.isFollowed} />
                        </div>
                    </div>
                    <div className="PersonRow__rating">
                        {person.rating}
                    </div>
                </td>
                <td className="PersonRow__ideas">{person.ideas}</td>
                <td className="PersonRow__following">{person.following}</td>
                <td className="PersonRow__followers">{person.followers}</td>
            </tr>
            /* jshint ignore:end */
        );
    }
});

module.exports = PersonRow;
