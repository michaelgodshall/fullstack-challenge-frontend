import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import { fetchHouseholds } from '../actions/householdsActions';

class HouseholdsIndex extends React.Component {
  componentWillMount() {
    // Fetch a list of households
    this.props.fetchHouseholds();
  }

  renderHouseholds() {
    return this.props.households.map((household) => {
      return (
        <li className="list-group-item" key={household.id}>
          <Link to={`households/${household.id}`}>
            <strong>{household.address}</strong>
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="btn-toolbar pull-right">
          <Link to="/households/new" className="btn btn-primary">
            Add household
          </Link>
        </div>
        <h3>Households</h3>
        <ul className="list-group">
          {this.renderHouseholds()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // Transform households to an array
  return { households: _.values(state.households.all) }
}

export default connect(mapStateToProps, { fetchHouseholds })(HouseholdsIndex);
