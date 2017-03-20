import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import { fetchHousehold } from '../actions/householdActions';
import { createPerson } from '../actions/personActions';
import FormField from '../components/FormField';
import HouseholdHeader from '../components/HouseholdHeader';
import FIELDS from '../constants/personFields';

class PersonNew extends React.Component {
  componentWillMount() {
    // Fetch a household with the given id
    const householdId = this.props.params.id;
    this.props.fetchHousehold(householdId);
  }

  onSubmit(props) {
    // Create the person for the current household
    const { household } = this.props;
    this.props.createPerson(household.id, props).then(() => {
      // Redirect to household show
      browserHistory.push(`/households/${household.id}`);
    });
  }

  onSubmitAddAnother(props) {
    // Create the person for the current household, but don't redirect
    const { household, reset } = this.props;
    this.props.createPerson(household.id, props).then(() => {
      // Reset the form
      reset();
    });
  }

  render() {
    const { handleSubmit, household } = this.props;

    if (!household) {
      return <div>Loading...</div>
    }

    // Generate field elements
    const fieldElements = _.map(FIELDS, (field, fieldName) => {
      return (
        <Field key={fieldName} name={fieldName} label={field.label} component={FormField}
               type={field.type} element={field.element} options={field.options} />
      );
    });

    return (
      <div>
        <HouseholdHeader household={household} />
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h3>Add Person</h3>
          {fieldElements}
          <div className="btn-toolbar justify-content-between" role="toolbar">
            <div>
              <button type="submit" className="btn btn-primary mr-2" role="button">Save</button>
              <a href="#" className="btn btn-secondary"
                 onClick={handleSubmit(this.onSubmitAddAnother.bind(this))}>Save and add another</a>
            </div>
            <div>
              <Link to={`/households/${household.id}`} className="btn btn-secondary">Cancel</Link>
            </div>
          </div>
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

