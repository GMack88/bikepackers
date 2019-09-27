import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProfileFavoriteRoutes from "./ProfileFavoriteRoutes";
import ProfileRacingResume from "./ProfileRacingResume";
import ProfileAbout from "./ProfileAbout";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import { getProfileById } from "../../actions/profile";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div class="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-rr bg-white p-2">
              <h2 className="text-primary">Racing Resume</h2>
              {profile.racingResume.length > 0 ? (
                <Fragment>
                  {profile.racingResume.map(racingResume => (
                    <ProfileRacingResume
                      key={racingResume._id}
                      racingResume={racingResume}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Racing history</h4>
              )}
            </div>

            <div className="profile-fav bg-white p-2">
              <h2 className="text-primary">Favorite Routes</h2>
              {profile.favoriteRoutes.length > 0 ? (
                <Fragment>
                  {profile.favoriteRoutes.map(favoriteRoutes => (
                    <ProfileRacingResume
                      key={favoriteRoutes._id}
                      favoriteRoutes={favoriteRoutes}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Added Routes</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
