import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import { fetchHousehold } from '../actions/householdsActions';
import { createPerson } from '../actions/personsActions';
import FormField from '../components/FormField';
import HouseholdHeader from '../components/HouseholdHeader';
import FIELDS from '../constants/personFields';

class PersonNew extends React.Component {
  componentWillMount(props) {
    // Fetch a household with the given id
    const householdId = this.props.params.id;
    this.props.fetchHousehold(householdId);
  }

  onSubmit(props) {
    // Create the person for the current household
    const { household } = this.props;
    this.props.createPerson(household.id, props, `/households/${household.id}`);
  }

  render() {
    const { handleSubmit, household } = this.props;

    if (!household) {
      return <div>Loading...</div>
    }

    // Generate field elements
    const fieldElements = _.map(FIELDS, (field, fieldName) => {
      return (
        <Field key={fieldName} name={fieldName} label={field.label}
               component={FormField} type={field.type} element={field.element} />
      );
    });

    return (
      <div>
        <HouseholdHeader household={household} />
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h3>Add Person</h3>
          {fieldElements}
          <button type="submit" className="btn btn-primary" role="button">Save</button>
          <Link to={`/households/${household.id}`} className="btn btn-danger">Cancel</Link>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    household: state.households.all[state.households.currentId],
  };
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
  connect(mapStateToProps, { fetchHousehold, createPerson }),
  reduxForm({form: 'PersonNewForm', validate}) // Connect the form component to redux
)(PersonNew);

