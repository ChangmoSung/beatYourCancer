import React, { Fragment, useState, useEffect } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { getFoodsList, addFood, deleteFood } from "../../../actions/users";
import eraser from "../../../images/eraser.png";

const Foods = ({
  getFoodsList,
  foodsList,
  addFood,
  deleteFood,
  isAuthenticated,
}) => {
  const [formData, setFormData] = useState({ foodName: "" });
  const { foodName } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addFood({ _id: `${foodName}-${uuidv4()}`, foodName });
  };

  useEffect(() => {
    getFoodsList();
  }, [getFoodsList]);

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="foodsContainer">
      <h2>Foods List</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="foodName"
          onChange={onChange}
          placeholder="Food name"
          aria-label="Food name"
          required
        />
        <button>Add</button>
      </form>
      <div className="foods">
        {foodsList.length > 0 &&
          foodsList.map(({ _id, foodName }, i) => (
            <div key={i} className="food">
              <span>{foodName}</span>
              <div className="buttonsContainer">
                <button
                  onClick={() =>
                    window.confirm(`Would you like to delete "${foodName}"?`) &&
                    deleteFood(_id)
                  }
                >
                  <img src={eraser} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

Foods.propTypes = {
  getFoodsList: PropTypes.func.isRequired,
  foodsList: PropTypes.array,
  addFood: PropTypes.func.isRequired,
  deleteFood: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  foodsList: state.users.foodsList,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getFoodsList,
  addFood,
  deleteFood,
})(Foods);
