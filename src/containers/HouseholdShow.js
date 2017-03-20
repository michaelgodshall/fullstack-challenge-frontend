import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import _ from 'lodash';
import { fetchHousehold, deleteHousehold, resetCurrentHousehold } from '../actions/householdActions';
import { fetchPersons } from '../actions/personActions';
import { fetchVehicles } from '../actions/vehicleActions';
import HouseholdHeader from '../components/HouseholdHeader';
import { getGenderDisplay } from '../utils/personHelper';

class HouseholdShow extends React.Component {
  componentWillMount() {
    const householdId = this.props.params.id;
    // Fetch a household with the given id
    this.props.fetchHousehold(householdId);
    // Fetch persons for the current household
    this.props.fetchPersons(householdId);
    // Fetch vehicles for the current household
    this.props.fetchVehicles(householdId);
  }

  componentWillUnmount() {
    // Reset the current household to prevent flash of content when loading new household
    this.props.resetCurrentHousehold();
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

    return persons.map((person) => {
      return (
        <div className="card" key={person.id}>
          <div className="card-block">
            <h5 className="card-title">{person.first_name} {person.last_name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{person.email}</h6>
            <p className="card-text">{person.age} year old {getGenderDisplay(person.gender)}</p>
          </div>
        </div>
      );
    });
  }

  renderVehicles() {
    const { vehicles, persons } = this.props;

    return vehicles.map((vehicle) => {
      // Get the person assigned to this vehicle
      const person = _.find(persons, {id: vehicle.person});

      if (person) {
        return (
          <div className="card" key={vehicle.id}>
            <div className="card-block">
              <h5 className="card-title">{vehicle.year} {vehicle.make} {vehicle.model}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{person.first_name} {person.last_name}</h6>
              <p className="card-text">License Plate: {vehicle.license_plate}</p>
            </div>
          </div>
        );
      }
    });
  }

  render() {
    const { household } = this.props;

    // Show loading if data hasn't loaded yet
    if (!household) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <HouseholdHeader household={household}/>

        <div className="mb-5">
          <div className="btn-toolbar justify-content-between mb-2" role="toolbar">
            <h3>People</h3>
          </div>
          <div className="card-columns">
            {this.renderPersons()}
            <div className="card text-center">
              <div className="card-block">
                <h5 className="card-title">New Person</h5>
                <Link to={`/households/${household.id}/persons/new`}
                      className="btn btn-primary">Add</Link>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="btn-toolbar justify-content-between mb-2" role="toolbar">
            <h3>Vehicles</h3>
          </div>
          <div className="card-columns">
            {this.renderVehicles()}
            <div className="card text-center">
              <div className="card-block">
                <h5 className="card-title">New Vehicle</h5>
                <Link to={`/households/${household.id}/vehicles/new`}
                      className="btn btn-primary">Add</Link>
              </div>
            </div>
          </div>
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

export default connect(mapStateToProps, { fetchHousehold, deleteHousehold, fetchPersons, fetchVehicles, resetCurrentHousehold })(HouseholdShow);
