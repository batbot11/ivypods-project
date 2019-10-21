/* eslint-disable react/prefer-stateless-function */
/* eslint-disable prettier/prettier */
import React from 'react';
import AsyncSelect from "react-select/async";
import PropTypes from "prop-types";
import FormInput from 'components/form/formInput/FormInput';
import validator from 'validator';

import './HomepageForm.css';

class HomepageForm extends React.Component {
  state = {
    pageNum: 1,
    data: {
      name: '',
      number: '',
      gender: '',
      hobbies: [],
      language: [],
      date: null,
      month: null,
      year: null,
      address: ''
    },
    errors: {},
  };

  getDateOptions = () => {
    const dateOptions = [];
    for (let i = 1; i < 32; i++) dateOptions.push(i);
    return dateOptions;
  };

  monthOptions = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ];

  getYearOptions = () => {
    const yearOptions = [];
    for (let i = 1900; i <= new Date().getFullYear(); i++) yearOptions.push(i);
    return yearOptions;
  };

  selectInputWidths = {
    large: {
      width: '90%',
      marginLeft: '5%',
    },
    small: {
      width: '20%',
      marginLeft: '5%',
    },
    medium: {
      width: '30%',
      marginLeft: '5%',
    },
  };

  onChange = event =>
    this.setState({
      data: { ...this.state.data, [event.target.name]: event.target.value },
    });

  onRadioChange = (name, value) => {
    this.setState({
      data: { ...this.state.data, [name]: value },
      errors: { ...this.state.errors, gender: null },
    });
  };

  onCheckboxChange = (event, value) => {
    if (event.target.checked)
      this.setState({
        data: {
          ...this.state.data,
          hobbies: [...this.state.data.hobbies, value],
        },
      });

    if (!event.target.checked)
      this.setState({
        data: {
          ...this.state.data,
          hobbies: this.state.data.hobbies.filter(hobby => hobby !== value),
        },
      });
  };

  onSelectChange = (event, name) => {
    this.setState({data: {...this.state.data, [name]: event.value}})
  }

  onMultiSelectChange = (event, name) => {
    const array = event.map(data => data.value)
    this.setState({data: {...this.state.data, [name]: array}})
  }

  onInputFocus = name => {
    this.setState({ errors: { ...this.state.errors, [name]: null } });
  };

  validate = {
    name: () => {
      if (!validator.isLength(this.state.data.name, { max: 100 }))
        this.setState({
          errors: {
            ...this.state.errors,
            name: 'Name should be less than 100 words',
          },
        });

      if (validator.isEmpty(this.state.data.name))
        this.setState({
          errors: { ...this.state.errors, name: "Name can't be left blank" },
        });
    },

    number: () => {
      if (
        !validator.isLength(this.state.data.number, 10) ||
        !validator.isNumeric(this.state.data.number)
      )
        this.setState({
          errors: {
            ...this.state.errors,
            number: 'Please enter a valid 10 digit number',
          },
        });

      if (validator.isEmpty(this.state.data.number))
        this.setState({
          errors: {
            ...this.state.errors,
            number: "Phone number can't be left blank",
          },
        });
    },

    gender: () => {
      if (validator.isEmpty(this.state.data.gender))
        this.setState({
          errors: {
            ...this.state.errors,
            gender: "Gender field can't be left blank",
          },
        });
    },
  };

  goNextPage = () => {
    Object.values(this.validate).map(value => value());

    setTimeout(() => {
      if (Object.values(this.state.errors).every(value => value === null))
        this.setState({ pageNum: 2 });
    }, 1000);
  };

  getLocationOptions = event => {
    this.props.getLocationOptions(event)
  }

  submitForm = e => {
    e.preventDefault();
    console.log('form data:', this.state.data);
  }

  render() {
    const { pageNum, data } = this.state;
    return (
      <div className="homepage__form--container">
        <form onSubmit={this.submitForm} className="homepage__form">
          {pageNum === 1 && (
            <React.Fragment>
              <FormInput
                type="text"
                name="name"
                onChange={this.onChange}
                value={data.name}
                placeholder="Enter Full Name"
                onBlur={this.validate.name}
                onFocus={this.onInputFocus}
                error={this.state.errors.name ? this.state.errors.name : null}
              />
              <FormInput
                type="text"
                name="number"
                placeholder="Enter your Mobile Number"
                onChange={this.onChange}
                value={data.number}
                onBlur={this.validate.number}
                onFocus={this.onInputFocus}
                error={
                  this.state.errors.number ? this.state.errors.number : null
                }
              />
              <FormInput
                type="radio"
                name="gender"
                values={['male', 'female', 'other']}
                onChange={this.onRadioChange}
                value={data.gender}
                error={
                  this.state.errors.gender ? this.state.errors.gender : null
                }
              />
              <FormInput
                type="checkbox"
                name="hobbies"
                values={['cricket', 'badminton', 'chess', 'reading']}
                onChange={this.onCheckboxChange}
                value={data.hobbies}
              />
              <button
                onClick={this.goNextPage}
                type="button"
                className="forminput__btn--next"
              >
                <span> Next </span>
                <span className="homepage__arrow">&rarr;</span>
              </button>
            </React.Fragment>
          )}

          {pageNum === 2 && (
            <React.Fragment>
              <FormInput
                type="select"
                name="language"
                placeholder="Enter Language"
                options={['hindi', 'english', 'punjabi', 'tamil', 'telugu']}
                dimension={this.selectInputWidths.large}
                isMulti
                onChange={this.onMultiSelectChange}
              />

              <text className="formfield__title">Date of Birth:</text>
              <FormInput
                type="select"
                name="date"
                placeholder="DD"
                options={this.getDateOptions()}
                dimension={this.selectInputWidths.small}
                onChange={this.onSelectChange}
                isDisabled={data.month === null}
              />
              <FormInput
                type="select"
                name="month"
                placeholder="MM"
                options={this.monthOptions}
                dimension={this.selectInputWidths.medium}
                onChange={this.onSelectChange}
                isDisabled={data.year === null}
              />
              <FormInput
                type="select"
                name="year"
                placeholder="YYYY"
                options={this.getYearOptions()}
                dimension={this.selectInputWidths.medium}
                onChange={this.onSelectChange}
              />

              <div style={{width: this.selectInputWidths.large.width, marginLeft: this.selectInputWidths.large.marginLeft}} >
              <text>Address:</text>
              <AsyncSelect
                loadOptions={this.getLocationOptions}
                options={this.props.locations}
              />
              </div>

              <button
                onClick={() => this.setState({ pageNum: 1 })}
                type="button"
                className="forminput__btn--prev"
              >
                <span className="homepage__arrow">&larr;</span>
                <span> Prev </span>
              </button>

              <button  type="submit" className="form__btn--submit">
                <span> Submit </span>
              </button>
            </React.Fragment>
          )}
        </form>
      </div>
    );
  }
}

HomepageForm.propTypes = {
  getLocationOptions: PropTypes.func,
  locations: PropTypes.array,
}

export default HomepageForm;
