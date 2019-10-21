/**
 *
 * Homepage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectHomepage, {makeSelectGetLocationOptionsSuccess} from './selectors';
import reducer from './reducer';
import saga from './saga';

import HomepageHeading from '../../components/homePage/homepageHeading/HomepageHeading';
import HomepageForm from '../../components/homePage/homepageForm/HomepageForm';

import { getLocationOptions } from './actions';

export function Homepage(props) {
  useInjectReducer({ key: 'homepage', reducer });
  useInjectSaga({ key: 'homepage', saga });


  const [locationText, setLocationText] = useState('');


  const getLocationOptions = text => {
    props.getLocationOptions(text);
  };

  return (
    <React.Fragment>
      <HomepageHeading text="Welcome To IvyPods" />
      <HomepageForm 
       locations={props.locations}
       getLocationOptions={getLocationOptions} />
    </React.Fragment>
  );
}

Homepage.propTypes = {
  getLocationOptions: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  homepage: makeSelectHomepage(),
  locations: makeSelectGetLocationOptionsSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getLocationOptions: location => dispatch(getLocationOptions(location)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Homepage);
