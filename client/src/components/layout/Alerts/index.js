import React from "react";
import "./index.scss";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alerts = ({ alerts }) => (
  <div className="alertsList">
    {alerts !== null &&
      alerts.length > 0 &&
      alerts.map(({ id, msg, alertType }) => (
        <div key={id} className={`alert alert-${alertType}`}>
          {msg}
        </div>
      ))}
  </div>
);

Alerts.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(Alerts);
