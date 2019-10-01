import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteFavoriteRoutes } from "../../actions/profile";

const FavoriteRoutes = ({ favoriteRoutes, deleteFavoriteRoutes }) => {
  const favs = favoriteRoutes.map(fav => (
    <tr key={fav._id}>
      <td>{fav.routeName}</td>
      <td className="hide-sm">{fav.difficultyRating}</td>
      <td>
        <button
          onClick={() => deleteFavoriteRoutes(fav._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Favorite Routes</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Route Name</th>
            <th className="hide-sm">Rating</th>
            <th className="hide-sm">Difficulty Rating</th>
            <th />
          </tr>
        </thead>
        <tbody>{favs}</tbody>
      </table>
    </Fragment>
  );
};

FavoriteRoutes.propTypes = {
  favoriteRoutes: PropTypes.array.isRequired,
  deleteFavoriteRoutes: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteFavoriteRoutes }
)(FavoriteRoutes);
