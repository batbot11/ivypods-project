/*
 *
 * Homepage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_LOCATION_OPTIONS,
  GET_LOCATION_OPTIONS_SUCCESS
} from './constants';

export const initialState = {
  getLocationOptions: '',
  getLocationOptionsSuccess: ''
};

/* eslint-disable default-case, no-param-reassign */
const homepageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_LOCATION_OPTIONS:
        draft.getLocationOptions = action.data;
        break;
      case GET_LOCATION_OPTIONS_SUCCESS:
        draft.getLocationOptionsSuccess = action.data;
    }
  });

export default homepageReducer;
