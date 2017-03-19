import React from 'react';

const HouseholdHeader = ({household}) => {
  return (
    <div className="mb-5">
      <h1>{household.address}</h1>
      <p className="lead">{household.city}, {household.state} {household.zip} / {household.number_of_bedrooms} bedrooms</p>
    </div>
  );
};

export default HouseholdHeader;
