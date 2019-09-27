import React from "react";
import PropTypes from "prop-types";

const ProfileFavoriteRoutes = ({
  favoriteRoutes: { routeName, distance, link }
}) => (
  <div>
    <h3 className="text-dark">{routeName}</h3>
    <p>{routeName}</p>
    <p>
      <strong>Route Distance: </strong>
      {distance}
    </p>
    <p>
      <strong>Location: </strong>
      {link}
    </p>
  </div>
);
ProfileFavoriteRoutes.propTypes = {
  favoriteRoutes: PropTypes.array.isRequired
};

export default ProfileFavoriteRoutes;
