import './PeopleList.styl';

import React from 'react';
import PersonRow from './PersonRow';

var PeopleList = React.createClass({
    render() {
        var people = this.props.people.map((person, i) => {
            if (person) {
                /* jshint ignore:start */
                return <PersonRow key={i} person={person} />;
                /* jshint ignore:end */
            }
        });

        return (
            /* jshint ignore:start */
            <div className="PeopleList">
                <table>
                    <thead>
                        <th className="PeopleList__name"></th>
                        <th className="PeopleList__ideas">Ideas</th>
                        <th className="PeopleList__following">Following</th>
                        <th className="PeopleList__followers">Followers</th>
                    </thead>
                    <tbody>
                        {people}
                    </tbody>
                </table>
            </div>
            /* jshint ignore:end */
        );
    }
});

module.exports = PeopleList;
