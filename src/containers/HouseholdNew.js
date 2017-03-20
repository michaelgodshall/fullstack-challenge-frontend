import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import { createHousehold } from '../actions/householdActions';
import FormField from '../components/FormField';
import FIELDS from '../constants/householdFields';

class HouseholdsNew extends React.Component {
  onSubmit(props) {
    // Create the household
    this.props.createHousehold(props).then(() => {
      // Redirect to household show
      // TODO How to get created household id to redirect?
      browserHistory.push('/');
    });
  }

  render() {
    // Get handleSubmit from renderForm
    const { handleSubmit } = this.props;

    // Generate field elements
    const fieldElements = _.map(FIELDS, (field, fieldName) => {
      return (
        <Field key={fieldName} name={fieldName} label={field.label} component={FormField}
               type={field.type} element={field.element} options={field.options} />
      );
    });

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h1>New Household</h1>
        {fieldElements}
        <div className="btn-toolbar justify-content-between" role="toolbar">
          <div>
            <button type="submit" className="btn btn-primary mr-2" role="button">Save</button>
          </div>
          <div>
            <Link to="/" className="btn btn-danger">Cancel</Link>
          </div>
        </div>
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
