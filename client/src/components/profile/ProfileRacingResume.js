import React from "react";
import PropTypes from "prop-types";

const ProfileRacingResume = ({
  racingResume: { eventDistance, eventName, location, date, description }
}) => {
  <div>
    <h3 className="text-dark">{eventName}</h3>
    <p>{date}</p>
    <p>
      <strong>Race distance: </strong>
      {eventDistance}
    </p>
    <p>
      <strong>Location: </strong>
      {location}
    </p>
    <p>
      <strong>Description: </strong>
      {description}
    </p>
  </div>;
};

ProfileRacingResume.propTypes = {
  racingResume: PropTypes.array.isRequired
};

export default ProfileRacingResume;
