import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homepage state domain
 */

const selectHomepageDomain = state => state.homepage || initialState;

/**
 * Other specific selectors
 */
const makeSelectGetLocationOptions = () =>
  createSelector(
    selectHomepageDomain,
    substate => substate.getLocationOptions,
  );

const makeSelectGetLocationOptionsSuccess = () => 
  createSelector(
    selectHomepageDomain,
    substate => substate.getLocationOptionsSuccess,
  );

/**
 * Default selector used by Homepage
 */

const makeSelectHomepage = () =>
  createSelector(
    selectHomepageDomain,
    substate => substate,
  );

export default makeSelectHomepage;
export {
  selectHomepageDomain,
  makeSelectGetLocationOptions,
  makeSelectGetLocationOptionsSuccess,
};
