import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'

const Profile = ({ getProfileById, profile: { profile }, auth, loading, }) => {
  const { id } = useParams();
  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  return (
    <section className="container">
      {profile === null ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id ===
              profile.user._id && (
                <Link to={`/edit-profile`} className="btn btn-dark">
                  Edit Profile
                </Link>
              )}
                <div class="profile-grid my-1">
                  <ProfileTop profile={profile} />
                  <ProfileAbout profile={profile} />
                </div>
        </>
      )}
    </section>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
