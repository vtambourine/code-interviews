import Flux from 'flux';
import assign from 'react/lib/Object.assign';
import PayloadSources from '../constants/PayloadSources';

var Dispatcher = assign(new Flux.Dispatcher(), {
    handleServerAction(action) {
        var payload = {
            source: PayloadSources.SERVER_ACTION,
            action: action
        };
        this.dispatch(payload);
    },

    handleViewAction(action) {
        var payload = {
            source: PayloadSources.VIEW_ACTION,
            action: action
        };
        this.dispatch(payload);
    }
});

module.exports = Dispatcher;
