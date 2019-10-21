/* eslint-disable prefer-template */
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import InlineError from 'components/form/inlineError/InlineError';
import './FormInput.css';

const FormInput = props => {
  const makeLabel = text => {
    if (typeof text === 'string')
      return text.substr(0, 1).toUpperCase() + text.substr(1, text.length);

    if (typeof text === 'number') return text;
  };

  if (props.type === 'text')
    return (
      <React.Fragment>
        <label className="forminput__label">
          {makeLabel(props.name) + ':'}
          <input
            name={props.name}
            className="form__input--text"
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.onChange}
            value={props.value}
            onBlur={props.onBlur}
            onFocus={() => props.onFocus(props.name)}
          />
        </label>
        {!!props.error && <InlineError text={props.error} />}
      </React.Fragment>
    );

  if (props.type === 'radio')
    return (
      <React.Fragment>
        <text className="forminput__radio--text">
          {makeLabel(props.name) + ':'}
        </text>

        {props.values.map(value => (
          <label className="forminput__radio">
            <input
              onClick={() => props.onChange(props.name, value)}
              type={props.type}
              name={props.name}
            />
            {makeLabel(value)}
          </label>
        ))}

        {!!props.error && (
          <InlineError style={{ marginTop: '10px' }} text={props.error} />
        )}
      </React.Fragment>
    );

  if (props.type === 'checkbox')
    return (
      <React.Fragment>
        <text className="forminput__radio--text">
          {makeLabel(props.name) + ':'}
        </text>

        {props.values.map(value => (
          <label className="forminput__radio">
            <input
              onClick={event => props.onChange(event, value)}
              type={props.type}
              name={props.name}
            />
            {makeLabel(value)}
          </label>
        ))}
      </React.Fragment>
    );

  if (props.type === 'select') {
    let selectOptions = [];

    if (!!props.options) {
      selectOptions = props.options.map(option => ({
        value: option,
        label: makeLabel(option),
      }));
    }

    return (
      <div
        style={{
          width: props.dimension.width,
          marginLeft: props.dimension.marginLeft,
        }}
        className="forminput__select--container"
      >
        <text className="forminput__radio--text">
          {makeLabel(props.name) + ':'}
        </text>

        <Select
          className="forminput__select"
          placeholder={props.placeholder}
          options={selectOptions}
          isMulti={props.isMulti}
          isDisabled={props.isDisabled}
          onChange={event => props.onChange(event, props.name)}
        />
      </div>
    );
  }
};

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  dimension: PropTypes.object,
  onChange: PropTypes.func,
};

export default FormInput;
