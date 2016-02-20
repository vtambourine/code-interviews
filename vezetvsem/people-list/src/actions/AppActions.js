import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import http from 'superagent';

module.exports = {
    loadData(count, callback) {
        Dispatcher.handleViewAction({
            actionType: ActionTypes.LOAD_DATA
        });

        http.get(`/api/peoples/${count}`)
            .accept('application/json')
            .end((error, response) => {
                Dispatcher.handleServerAction({
                    actionType: ActionTypes.LOAD_DATA,
                    data: JSON.parse(response.text)
                });

                if (callback) {
                    callback();
                }
            });
    }
};
