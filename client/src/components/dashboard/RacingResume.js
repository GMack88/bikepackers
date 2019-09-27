import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteRacingResume } from "../../actions/profile";

const RacingResume = ({ racingResume, deleteRacingResume }) => {
  const races = racingResume.map(race => (
    <tr key={race._id}>
      <td>{race.eventDistance}</td>
      <td className="hide-sm">{race.location}</td>

      <td>
        <button
          onClick={() => deleteRacingResume(race._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
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

            <th />
          </tr>
        </thead>
        <tbody>{races}</tbody>
      </table>
    </Fragment>
  );
};

RacingResume.propTypes = {
  racingResume: PropTypes.array.isRequired,
  deleteRacingResume: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteRacingResume }
)(RacingResume);
