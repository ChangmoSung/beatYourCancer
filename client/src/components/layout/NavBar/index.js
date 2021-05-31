import React, { Fragment } from "react";
import "./index.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { signOut } from "../../../actions/auth";

const NavBar = ({ signOut }) => {
  return (
    <Fragment>
      <nav>
        <ul>
          <button
            onClick={() => {
              if (window.confirm("Would you like to sign out?")) {
                signOut();
              }
            }}
          >
            Sign out
          </button>
        </ul>
      </nav>
    </Fragment>
  );
};

NavBar.propTypes = {
  signOut: PropTypes.func,
};

export default connect(null, { signOut })(NavBar);
