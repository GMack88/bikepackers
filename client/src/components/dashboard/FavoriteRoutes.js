import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const FavoriteRoutes = ({ favoriteRoutes }) => {
  const favs = favoriteRoutes.map(fav => (
    <tr key={fav._id}>
      <td>{fav.routeName}</td>
      <td className="hide-sm">{fav.difficultyRating}</td>
      <td>
        <button className="btn btn-danger">Delete</button>
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
            <th className="hide-sm">Distance</th>
            <th className="hide-sm">Difficulty Rating</th>
            <th className="hide-sm">Link</th>
            <th />
          </tr>
        </thead>
        <tbody>{favs}</tbody>
      </table>
    </Fragment>
  );
};

FavoriteRoutes.propTypes = {
  favoriteRoutes: PropTypes.array.isRequired
};

export default FavoriteRoutes;
