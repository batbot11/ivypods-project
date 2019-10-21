import React from 'react';
import PropTypes from 'prop-types';
import './InlineError.css';

const InlineError = ({ text, style }) => (
  <span style={!!style ? style : null} className="inline__error">
    {text}
  </span>
);

InlineError.propTypes = {
  text: PropTypes.string,
  style: PropTypes.object,
};

export default InlineError;
