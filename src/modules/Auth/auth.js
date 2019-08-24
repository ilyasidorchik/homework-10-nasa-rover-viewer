import { handleActions } from 'redux-actions';

import { addKey } from './actions';

const apiKey = handleActions(
    {
        [addKey]: (_state, action) => action.payload
    },
    null
);

export default apiKey;