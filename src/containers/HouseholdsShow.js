import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchHousehold } from '../actions/householdsActions';

class HouseholdsShow extends React.Component {
  componentWillMount() {
    // Fetch a household with the given id
    this.props.fetchHousehold(this.props.params.id);
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
        <h3>{household.address}</h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { household: state.households.all[state.households.showId] };
}

export default connect(mapStateToProps, { fetchHousehold })(HouseholdsShow);
