import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile.html" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link to="add-racing-resume" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i> Add Racing Resume
      </Link>
      <Link to="add-favorite-routes" className="btn btn-light">
        <div></div> Add Favorite Routes
      </Link>
    </div>
  );
};

export default DashboardActions;
