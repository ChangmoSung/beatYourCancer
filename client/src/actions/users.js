import axios from "axios";
import { setAlert } from "./alerts";
import {
  FOODS_LOADED,
  FOODS_LOADED_ERROR,
  ADD_FOOD,
  ADD_FOOD_ERROR,
  DELETE_FOOD,
  DELETE_FOOD_ERROR,
} from "./types.js";

export const getFoodsList = () => async (dispatch) => {
  try {
    const res = await axios.get("/users/getFoodsList");

    dispatch({
      type: FOODS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FOODS_LOADED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addFood = (foodInfo = {}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(foodInfo);
  try {
    const res = await axios.put("/users/addFood", body, config);

    dispatch({
      type: ADD_FOOD,
      payload: res.data,
    });
    dispatch(setAlert({ msg: "Food added", alertType: "success" }));
  } catch (err) {
    dispatch({
      type: ADD_FOOD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert({ msg: "Food not added", alertType: "danger" }));
  }
};

export const deleteFood = (foodId = "") => async (dispatch) => {
  try {
    const res = await axios.delete(`/users/deleteFood/${foodId}`);

    dispatch({
      type: DELETE_FOOD,
      payload: res.data,
    });
    dispatch(setAlert({ msg: "Food deleted", alertType: "success" }));
  } catch (err) {
    dispatch({
      type: DELETE_FOOD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert({ msg: "Food not deleted", alertType: "danger" }));
  }
};
