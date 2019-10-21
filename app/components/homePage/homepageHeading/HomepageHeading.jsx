import React from 'react';
import PropTypes from 'prop-types';

import './HomepageHeading.css';

const HomepageHeading = ({ text }) => (
  <div className="homepage__heading--container">
    <h1 className="homepage__heading">{text}</h1>
  </div>
);

HomepageHeading.propTypes = {
  text: PropTypes.string,
};

export default HomepageHeading;
