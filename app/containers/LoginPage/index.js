/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import HomepageHeading from 'components/homePage/homepageHeading/HomepageHeading';
import HomepageForm from 'components/homePage/homepageForm/HomepageForm';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';

useInjectReducer({ key: 'loginPage', reducer });
useInjectSaga({ key: 'loginPage', saga });

class LoginPage extends React.PureComponent {



  render () {



    return (
      <React.Fragment>
      <Helmet>
        <title>LoginPage</title>
        <meta name="description" content="Description of LoginPage" />
      </Helmet>
      <HomepageHeading text="Welcome To IvyPods" />
      <HomepageForm />
    </React.Fragment>
    )
  }
}
// export function LoginPage() {

//   return (
//   );
// }

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginPage);
