import React, { useState } from "react";
import "./index.scss";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { signUp } from "../../../actions/auth";
import PropTypes from "prop-types";

const SignUpPage = ({ signUp, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const { firstName, lastName, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password.length < 3) {
      alert("Password must be at least 3 characters");
      return;
    }

    if (password === password2) {
      signUp({ firstName, lastName, email, password });
    } else {
      alert("Make sure passwords match");
    }
  };

  if (isAuthenticated) return <Redirect to="/mainPage" />;

  return (
    <div className="container">
      <div className="wrapper signUpPage">
        <h1>Flower roads</h1>
        <p>Please sign up here</p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="firstName"
            onChange={onChange}
            placeholder="First name"
            aria-label="First name"
            required
          />
          <input
            type="text"
            name="lastName"
            onChange={onChange}
            placeholder="Last name"
            aria-label="Last name"
            required
          />
          <input
            type="email"
            name="email"
            onChange={onChange}
            placeholder="Email"
            aria-label="Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChange}
            placeholder="Password"
            aria-label="Password"
            required
          />
          <input
            type="password"
            name="password2"
            onChange={onChange}
            placeholder="Confirm password"
            aria-label="Confirm password"
            required
          />
          <button>Sign up</button>
        </form>
        <Link to="/">Sign in</Link>
      </div>
    </div>
  );
};

SignUpPage.propTypes = {
  signUp: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signUp })(SignUpPage);
