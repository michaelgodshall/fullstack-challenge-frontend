import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import _ from 'lodash';
import { fetchHousehold, deleteHousehold } from '../actions/householdActions';
import { fetchPersons } from '../actions/personActions';
import { fetchVehicles } from '../actions/vehicleActions';
import HouseholdHeader from '../components/HouseholdHeader';

class HouseholdsShow extends React.Component {
  componentWillMount() {
    const householdId = this.props.params.id;
    // Fetch a household with the given id
    this.props.fetchHousehold(householdId);
    // Fetch persons for the current household
    this.props.fetchPersons(householdId);
    // Fetch vehicles for the current household
    this.props.fetchVehicles(householdId);
  }

  onDeleteClick() {
    // Delete the household
    this.props.deleteHousehold(this.props.params.id).then(() => {
      // Redirect to household index
      browserHistory.push('/');
    });
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

  renderVehicles() {
    const { vehicles } = this.props;

    if (!vehicles.length) {
      return <div>None</div>
    }

    return vehicles.map((vehicle) => {
      return (
        <li className="list-group-item" key={vehicle.id}>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </li>
      )
    })
  }

  render() {
    const { household } = this.props;

    // Show loading if data hasn't loaded yet
    if (!household) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <HouseholdHeader household={household}/>

        <div className="mb-5">
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

        <div>
          <div className="btn-toolbar justify-content-between mb-2" role="toolbar">
            <h3>Vehicles</h3>
            <div className="button-group" role="group">
              <Link to={`/households/${household.id}/vehicles/new`}
                    className="btn btn-primary">Add Vehicle</Link>
            </div>
          </div>
          <ul className="list-group">
            {this.renderVehicles()}
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
    persons: _.filter(_.values(state.persons.all), {'household': state.persons.filter.householdId}),
    // Filter vehicles by current household
    vehicles: _.filter(_.values(state.vehicles.all), {'household': state.vehicles.filter.householdId})
  };
}

export default connect(
  mapStateToProps,
  { fetchHousehold, deleteHousehold, fetchPersons, fetchVehicles })
(HouseholdsShow);
