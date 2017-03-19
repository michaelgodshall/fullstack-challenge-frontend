import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import { createHousehold } from '../actions/householdsActions';
import FormField from '../components/FormField';

const FIELDS = {
  address: {
    element: 'input',
    label: 'Address',
    type: 'text'
  },
  city: {
    element: 'input',
    label: 'City',
    type: 'text'
  },
  state: {
    element: 'input',
    label: 'State',
    type: 'text'
  },
  zip: {
    element: 'input',
    label: 'Zipcode',
    type: 'text'
  },
  number_of_bedrooms: {
    element: 'input',
    label: 'Number of bedrooms',
    type: 'text'
  }
};

class HouseholdsNew extends React.Component {
  onSubmit(props) {
    // Create the household
    this.props.createHousehold(props)
  }

  render() {
    // Get handleSubmit from renderForm
    const { handleSubmit } = this.props;

    // Generate field elements
    const fieldElements = _.map(FIELDS, (field, fieldName) => {
      return (
        <Field key={fieldName}
               name={fieldName}
               label={field.label}
               component={FormField}
               type={field.type}
               element={field.element} />
      );
    });

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>New Household</h3>
        {fieldElements}
        <button type="submit" className="btn btn-primary">Save</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// Validate each form field
function validate(values) {
  const errors = {};

  _.each(FIELDS, (field, fieldName) => {
    if (!values[fieldName]) {
      errors[fieldName] = `This field is required`;
    }
  });

  return errors;
}

export default compose(
  connect(null, { createHousehold }),
  reduxForm({form: 'HouseholdNewForm', validate})  // Connect the form component to redux
)(HouseholdsNew);
