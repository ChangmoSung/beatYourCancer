import React, { Fragment, useState, useEffect } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import {
  getSideEffectsListByUser,
  addSideEffectByUser,
  deleteSideEffectByUser,
} from "../../../actions/users";
import {
  getSideEffectsListByAdmin,
  addSideEffectByAdmin,
  deleteSideEffectByAdmin,
} from "../../../actions/sideEffects";

const SideEffects = ({
  roles,
  getSideEffectsListByUser,
  getSideEffectsListByAdmin,
  sideEffectsListByUser,
  addSideEffectByUser,
  deleteSideEffectByUser,
  addSideEffectByAdmin,
  deleteSideEffectByAdmin,
  sideEffectsListByAdmin,
  isAuthenticated,
}) => {
  const [formData, setFormData] = useState({ sideEffectByUser: "" });
  const { sideEffectByUser } = formData;

  const [formDataByAdmin, setFormDataByAdmin] = useState({
    sideEffectByAdmin: "",
  });
  const { sideEffectByAdmin } = formDataByAdmin;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addSideEffectByUser({ _id: uuidv4(), sideEffectByUser });
  };

  const onChangeByAdmin = (e) =>
    setFormDataByAdmin({ ...formDataByAdmin, [e.target.name]: e.target.value });
  const onSubmitByAdmin = (e) => {
    e.preventDefault();
    addSideEffectByAdmin({ sideEffectByAdmin });
  };

  const admin = roles.includes("admin");

  useEffect(() => {
    getSideEffectsListByUser();
    getSideEffectsListByAdmin();
  }, [getSideEffectsListByUser, getSideEffectsListByAdmin]);

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <Fragment>
      <h2>Side effects</h2>
      <div className="sideEffectsByAdmin">
        {admin && (
          <form onSubmit={onSubmitByAdmin}>
            <input
              type="text"
              name="sideEffectByAdmin"
              onChange={onChangeByAdmin}
              placeholder="Side effect"
              aria-label="Side effect"
              required
            />
            <button>Add</button>
          </form>
        )}
        {sideEffectsListByAdmin.length > 0 &&
          sideEffectsListByAdmin.map(({ _id, sideEffectByAdmin }, i) => (
            <div key={i} className="individualSideEffectByAdmin">
              <span>{sideEffectByAdmin}</span>
              {admin && (
                <div className="buttonsContainer">
                  <button
                    onClick={() =>
                      window.confirm(
                        `Would you like to delete "${sideEffectByAdmin}"?`
                      ) && deleteSideEffectByAdmin(_id)
                    }
                  >
                    X
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="sideEffectsByUser">
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="sideEffectByUser"
            onChange={onChange}
            placeholder="Side effect"
            aria-label="Side effect"
            required
          />
          <button>Add</button>
        </form>
        {sideEffectsListByUser.length > 0 &&
          sideEffectsListByUser.map(({ _id, sideEffectByUser }, i) => (
            <div key={i} className="individualSideEffectByUser">
              <span>{sideEffectByUser}</span>
              <div className="buttonsContainer">
                <button
                  onClick={() =>
                    window.confirm(
                      `Would you like to delete "${sideEffectByUser}"?`
                    ) && deleteSideEffectByUser(_id)
                  }
                >
                  X
                </button>
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

SideEffects.propTypes = {
  roles: PropTypes.array,
  getSideEffectsListByUser: PropTypes.func.isRequired,
  getSideEffectsListByAdmin: PropTypes.func.isRequired,
  sideEffectsListByUser: PropTypes.array,
  addSideEffectByUser: PropTypes.func.isRequired,
  deleteSideEffectByUser: PropTypes.func.isRequired,
  addSideEffectByAdmin: PropTypes.func.isRequired,
  deleteSideEffectByAdmin: PropTypes.func.isRequired,
  sideEffectsListByAdmin: PropTypes.array,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  roles: state.users.roles,
  sideEffectsListByUser: state.users.sideEffectsListByUser,
  sideEffectsListByAdmin: state.sideEffects.sideEffectsListByAdmin,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getSideEffectsListByUser,
  getSideEffectsListByAdmin,
  addSideEffectByUser,
  deleteSideEffectByUser,
  addSideEffectByAdmin,
  deleteSideEffectByAdmin,
})(SideEffects);
