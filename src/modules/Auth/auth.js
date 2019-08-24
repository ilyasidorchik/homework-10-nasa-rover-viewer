import { handleActions } from 'redux-actions';

import { addKey } from './actions';
import { combineReducers } from '../../../../homework-9-github-follower-list/node_modules/redux';

const apiKey = handleActions(
    {
        [addKey]: (_state, action) => action.payload
    },
    null
);

export default combineReducers({
    apiKey
});