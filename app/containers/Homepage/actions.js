/*
 *
 * Homepage actions
 *
 */

import { DEFAULT_ACTION,
         GET_LOCATION_OPTIONS,
         GET_LOCATION_OPTIONS_SUCCESS } from './constants';

export function getLocationOptions(data) {
  return {
    type: GET_LOCATION_OPTIONS,
    data,
  };
}

export function getLocationOptionsSuccess(data) {
  return {
    type: GET_LOCATION_OPTIONS_SUCCESS,
    data,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
