import './App.styl';

import React from 'react';
import PeopleStore from '../../stores/PeopleStore';
import PeopleList from '../PeopleList';
import ShowMoreButton from '../ShowMoreButton';

function getListState() {
    return {
        people: PeopleStore.getData()
    };
}

var Application = React.createClass({
    getInitialState() {
        return getListState();
    },

    componentDidMount() {
        PeopleStore.addChangeListener(this._onChange);
    },

    componentWillUnmount() {
        PeopleStore.removeChangeListener(this._onChange);
    },

    render() {
        return (
            /* jshint ignore:start */
            <div className="App">
                <div className="App__peopleList">
                    <h3 className="App__header">People</h3>
                    <PeopleList people={this.state.people} />
                    <ShowMoreButton />
                </div>
            </div>
            /* jshint ignore:end */
        );
    },

    _onChange() {
        this.setState(getListState());
    }
});

module.exports = Application;
