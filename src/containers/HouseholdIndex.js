import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import { fetchHouseholds } from '../actions/householdActions';

class HouseholdIndex extends React.Component {
  componentWillMount() {
    // Fetch a list of households
    this.props.fetchHouseholds();
  }

  renderHouseholds() {
    const { households } = this.props;

    if (!households.length) {
      return <div>No households have been created</div>;
    }
    return this.props.households.map((household) => {
      return (
        <li className="list-group-item list-group-item-action" key={household.id}>
          <Link to={`/households/${household.id}`}>
            {household.address}
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div>
          <h1>Households</h1>
        </div>
        <ul className="list-group">
          {this.renderHouseholds()}
        </ul>
      </div>
    );
  }
}

HouseholdIndex.propTypes = {
  fetchHouseholds: PropTypes.func.isRequired,
  households: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  // Transform households to an array
  return { households: _.values(state.households.all) };
}

export default connect(mapStateToProps, { fetchHouseholds })(HouseholdIndex);
