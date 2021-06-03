import React, { Fragment, useState, useEffect } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import {
  getSideEffectsList,
  addSideEffectByUser,
  deleteSideEffectByUser,
} from "../../../actions/users";

const SideEffects = ({
  getSideEffectsList,
  sideEffectsList,
  addSideEffectByUser,
  deleteSideEffectByUser,
  isAuthenticated,
}) => {
  const [formData, setFormData] = useState({ sideEffect: "" });
  const { sideEffect } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addSideEffectByUser({ _id: uuidv4(), sideEffect });
  };

  useEffect(() => {
    getSideEffectsList();
  }, [getSideEffectsList]);

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <Fragment>
      <h2>SideEffects</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="sideEffect"
          onChange={onChange}
          placeholder="Side effect"
          aria-label="Side effect"
          required
        />
      </form>
      {sideEffectsList.length > 0 &&
        sideEffectsList.map(({ _id, sideEffect }, i) => (
          <div key={i} className="individualSideEffect">
            <span>{sideEffect}</span>
            <div className="buttonsContainer">
              <button
                onClick={() =>
                  window.confirm(`Would you like to delete ${sideEffect}?`) &&
                  deleteSideEffectByUser(_id)
                }
              >
                X
              </button>
            </div>
          </div>
        ))}
    </Fragment>
  );
};

SideEffects.propTypes = {
  getSideEffectsList: PropTypes.func.isRequired,
  sideEffectsList: PropTypes.array,
  addSideEffectByUser: PropTypes.func.isRequired,
  deleteSideEffectByUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  sideEffectsList: state.users.sideEffectsList,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getSideEffectsList,
  addSideEffectByUser,
  deleteSideEffectByUser,
})(SideEffects);
