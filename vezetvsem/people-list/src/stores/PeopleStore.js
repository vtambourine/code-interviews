import {EventEmitter} from 'events';
import assign from 'react/lib/Object.assign';
import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import PayloadSources from '../constants/PayloadSources';

var CHANGE_EVENT = 'change';

var _list = [];
var _loading = false;

var AppStore = assign({}, EventEmitter.prototype, {

    getData() {
        return _list;
    },

    emitChange() {
        return this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

});

AppStore.dispatcherToken = Dispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {
        case ActionTypes.LOAD_DATA:
            if (action.source === PayloadSources.VIEW_ACTION) {
                _loading = true;
            } else {
                if (!action.error && action.data) {
                    _list = _list.concat(action.data);
                }
            }
            AppStore.emitChange();
            break;

        default:
        // Do nothing
    }
});

module.exports = AppStore;

