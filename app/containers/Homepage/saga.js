import { call, put, select, takeLatest } from 'redux-saga/effects';

import {GET_LOCATION_OPTIONS} from "./constants";

import {makeSelectGetLocationOptions} from "./selectors";

import {getLocationOptionsSuccess} from "./actions";

import api from "../../api/api";

function* getLocationOptions() {
  const userData = yield select(makeSelectGetLocationOptions());

  try {
    const response = yield call(api.form.getLocationOptions(userData));

    const responseData = [];

    if (response.predictions.length > 0) {
      const { predictions } = response;
      for (let i = 0; i < 10; i++) {
        responseData.push(predictions[i].description)
      }
      yield put(getLocationOptionsSuccess(responseData));
    }
  }
  catch(err) {
    console.log('error caught in saga', err);
  }
}

// function* getRepos() {
//   console.log('get repos saga called');
//   // Select username from store
//   // const username = yield select(makeSelectUsername());
//   // const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

//   // try {
//   //   // Call our request helper (see 'utils/request')
//   //   const repos = yield call(request, requestURL);
//   //   yield put(reposLoaded(repos, username));
//   // } catch (err) {
//   //   yield put(repoLoadingError(err));
//   // }
// }

/**
 * Root saga manages watcher lifecycle
 */
export default function* homepageSaga() {
  yield takeLatest(GET_LOCATION_OPTIONS, getLocationOptions);
}