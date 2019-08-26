import { takeEvery, select, all, put, call, fork } from 'redux-saga/effects';

import { changeSol, fetchPhotosRequest, fetchPhotosSuccess, fetchPhotosFailure } from './actions';
import { getApiKey } from '../Auth';
import { getPhotos } from './api';
import rovers from '../../rovers';

function* fetchPhotosWatcher() {
  yield takeEvery(fetchPhotosRequest, fetchPhotosFlow);
}

function* fetchPhotosFlow(action) {
  const { name, sol } = action.payload;

  try {
    const apiKey = yield select(getApiKey);

    const data = yield call(getPhotos, apiKey, name, sol);
    yield put(fetchPhotosSuccess({ name, sol, photos: data.photos }));
  }
  catch (error) {
    yield put(fetchPhotosFailure({ name, sol, error }));
  }
}

function* changeSolWatcher() {
    yield takeEvery(changeSol, changeSolFlow);
}

function* changeSolFlow(action) {    
    try {
        const sol = action.payload;
        const apiKey = yield select(getApiKey);

        yield all([
            put(fetchPhotosRequest({ apiKey, name: rovers[0], sol })),
            put(fetchPhotosRequest({ apiKey, name: rovers[1], sol })),
            put(fetchPhotosRequest({ apiKey, name: rovers[2], sol }))
        ]);
    }
    catch (error) {
        yield all([
            put(fetchPhotosFailure({ name: rovers[0], error })),
            put(fetchPhotosFailure({ name: rovers[1], error })),
            put(fetchPhotosFailure({ name: rovers[2], error }))
        ]);
    }
}

export default function*() {
    yield fork(fetchPhotosWatcher);
    yield fork(changeSolWatcher);
}