import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const RacingResume = ({ racingResume }) => {
  const races = racingResume.map(race => (
    <tr key={race._id}>
      <td>{race.eventDistance}</td>
      <td className="hide-sm">{race.location}</td>
      <td>
        <button className="btn btn-danger">Delete</button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Racing Resume</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Event Distance</th>
            <th className="hide-sm">Event Name</th>
            <th className="hide-sm">Location</th>
            <th className="hide-sm">Date</th>
            <th />
          </tr>
        </thead>
        <tbody>{races}</tbody>
      </table>
    </Fragment>
  );
};

RacingResume.propTypes = {
  racingResume: PropTypes.array.isRequired
};

export default RacingResume;
