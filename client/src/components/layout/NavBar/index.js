import React, { Fragment } from "react";
import "./index.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { signOut } from "../../../actions/auth";

const NavBar = ({ signOut }) => {
  return (
    <Fragment>
      <nav>
        <ul>
          <li>
            <Link to="/foods">Foods</Link>
          </li>
          <li>
            <Link to="/sideEffects">Side effects</Link>
          </li>
          <li>
            <Link to="/chemotherapy">Chemotherapy</Link>
          </li>
          <li>
            <Link
              to="/"
              onClick={() => {
                if (window.confirm("Would you like to sign out?")) {
                  signOut();
                }
              }}
            >
              Sign out
            </Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

NavBar.propTypes = {
  signOut: PropTypes.func,
};

export default connect(null, { signOut })(NavBar);
