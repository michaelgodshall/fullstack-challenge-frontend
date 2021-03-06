import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import { createHousehold } from '../actions/householdActions';
import FormField from '../components/FormField';
import FIELDS from '../constants/householdFields';

class HouseholdNew extends React.Component {
  onSubmit(props) {
    // Create the household
    this.props.createHousehold(props);
  }

  onSubmitNewPerson(props) {
    // Create the household and redirect to PersonNew
    this.props.createHousehold(props, '/persons/new');
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
            <a href="#" className="btn btn-secondary"
               onClick={handleSubmit(this.onSubmitNewPerson.bind(this))}>Save and add person</a>
          </div>
          <div>
            <Link to="/" className="btn btn-secondary">Cancel</Link>
          </div>
        </div>
      </form>
    );
  }
}

HouseholdNew.propTypes = {
  createHousehold: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

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
)(HouseholdNew);
