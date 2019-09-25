import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addFavoriteRoutes } from "../../actions/profile";

const AddFavoriteRoutes = ({ addFavoriteRoutes, history }) => {
  const [formData, setFormData] = useState({
    routeName: "",
    distance: "",
    difficultyRating: "",
    link: ""
  });

  const [toDateDisabled, toggleDisabled] = useState(false);
  const { routeName, distance, difficultyRating, link } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <h1 className="large text-primary">Add Your Favorite Routes</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any bikepacking routes you know
        and love.
      </p>
      <small>* = required field</small>
      <form
        className="form"
        onSubmit={e => {
          e.preventDefault();
          addFavoriteRoutes(formData, history);
        }}
      >
        <div className="form-group">
          <input
            type="text"
            placeholder="* Route Name"
            name="routeName"
            value={routeName}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Distance"
            name="distance"
            value={distance}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Difficulty Rating"
            name="difficultyRating"
            value={difficultyRating}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Link"
            name="link"
            value={link}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">
          Go Back
        </a>
      </form>
    </Fragment>
  );
};

AddFavoriteRoutes.propTypes = {
  addFavoriteRoutes: PropTypes.func.isRequired
};

export default connect(
  null,
  { addFavoriteRoutes }
)(addFavoriteRoutes);
