import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchHousehold, deleteHousehold } from '../actions/householdsActions';

class HouseholdsShow extends React.Component {
  componentWillMount() {
    // Fetch a household with the given id
    this.props.fetchHousehold(this.props.params.id);
  }

  onDeleteClick() {
    // Delete the household
    this.props.deleteHousehold(this.props.params.id)
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

      </div>
    );
  }
}

function mapStateToProps(state) {
  return { household: state.households.all[state.households.showId] };
}

export default connect(mapStateToProps, { fetchHousehold, deleteHousehold })(HouseholdsShow);
