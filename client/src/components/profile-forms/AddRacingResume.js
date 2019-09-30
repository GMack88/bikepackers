import React, { Fragment, useState } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addRacingResume } from "../../actions/profile";

const AddRacingResume = ({ addRacingResume, history }) => {
  const [formData, setFormData] = useState({
    eventDistance: "",
    eventName: "",
    location: "",
    date: "",
    description: ""
  });

  const [toDateDisabled, toggleDisabled] = useState(false);
  const { eventDistance, eventName, location, date, description } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <h1 className="large text-primary">Add Racing Resume</h1>
      <p className="lead">
        <i className="fa fa-file-text-o"></i> Add some of your accomplishments
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          addRacingResume(formData, history);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Event Distance"
            name="eventDistance"
            value={eventDistance}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Event Name"
            name="eventName"
            value={eventName}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Date"
            name="date"
            value={date}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Description"
            value={description}
            onChange={e => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="/dashboard">
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

AddRacingResume.propTypes = {
  addRacingResume: PropTypes.func.isRequired
};

export default connect(
  null,
  { addRacingResume }
)(withRouter(AddRacingResume));
