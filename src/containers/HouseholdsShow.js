import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import { fetchHousehold, deleteHousehold } from '../actions/householdsActions';
import { fetchPersons } from '../actions/personsActions';

class HouseholdsShow extends React.Component {
  componentWillMount() {
    // Fetch a household with the given id
    this.props.fetchHousehold(this.props.params.id);
    // Fetch persons for the current household
    this.props.fetchPersons(this.props.params.id);
  }

  onDeleteClick() {
    // Delete the household
    this.props.deleteHousehold(this.props.params.id)
  }

  renderPersons() {
    const { persons } = this.props;

    if (!persons.length) {
      return <div>None</div>
    }

    return persons.map((person) => {
      return (
        <li className="list-group-item" key={person.id}>
          {person.first_name} {person.last_name}
        </li>
      );
    });
  }

  render() {
    const { household } = this.props;

    // Show loading if data hasn't loaded yet
    if (!household) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <div>
          <h1>{household.address}</h1>
          <p className="lead">{household.city}, {household.state} {household.zip} / {household.number_of_bedrooms} bedrooms</p>
        </div>

        <div>
          <div className="btn-toolbar justify-content-between mb-2" role="toolbar">
            <h3>People</h3>
            <div className="button-group" role="group">
              <Link to={`/households/${household.id}/persons/new`}
                    className="btn btn-primary">Add Person</Link>
            </div>
          </div>
          <ul className="list-group">
            {this.renderPersons()}
          </ul>
        </div>

        <div className="mt-4">
          <button className="btn btn-danger" role="button" onClick={this.onDeleteClick.bind(this)}>
            Delete Household
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    household: state.households.all[state.households.currentId],
    // Filter persons by the current household
    persons: _.filter(_.values(state.persons.all), {'household': state.persons.filter.householdId})
  };
}

export default connect(mapStateToProps, { fetchHousehold, deleteHousehold, fetchPersons })(HouseholdsShow);
