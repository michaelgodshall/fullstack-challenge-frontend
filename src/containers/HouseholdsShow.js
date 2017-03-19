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
    return this.props.persons.map((person) => {
      return (
        <li className="list-group-item" key={person.id}>
          <strong>{person.first_name} {person.last_name}</strong>
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
        <Link to="/">Back to households</Link>
        <div>
          <div className="btn-toolbar pull-right">
            <button className="btn btn-danger"
                    onClick={this.onDeleteClick.bind(this)}>
              Delete Household
            </button>
          </div>
          <h3>{household.address}</h3>
          <p>{household.city}, {household.state} {household.zip}</p>
          <p>Bedrooms: {household.number_of_bedrooms}</p>
        </div>
        <div>
          <h4>People</h4>
          <ul className="list-group">
            {this.renderPersons()}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    household: state.households.all[state.households.showId],
    // Filter persons by the current household
    persons: _.filter(_.values(state.persons.all), {'household': state.persons.filter.householdId})
  };
}

export default connect(mapStateToProps, { fetchHousehold, deleteHousehold, fetchPersons })(HouseholdsShow);
