import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchHouseholds } from '../actions/householdsActions';

class HouseholdsIndex extends React.Component {
  componentWillMount() {
    this.props.fetchHouseholds();
  }

  renderHouseholds() {
    const households = _.values(this.props.households);
    return households.map((household) => {
      return (
        <li className="list-group-item" key={household.id}>
          <strong>{household.address}</strong>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Households</h1>
        <ul className="list-group">
          {this.renderHouseholds()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { households: state.households }
}

export default connect(mapStateToProps, { fetchHouseholds })(HouseholdsIndex);
