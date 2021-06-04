import axios from "axios";
import { setAlert } from "./alerts";
import {
  ROLES_LOADED,
  ROLES_LOADED_ERROR,
  FOODS_LOADED,
  FOODS_LOADED_ERROR,
  ADD_FOOD,
  ADD_FOOD_ERROR,
  DELETE_FOOD,
  DELETE_FOOD_ERROR,
  SIDE_EFFECTS_BY_USER_LOADED,
  SIDE_EFFECTS_BY_USER_LOADED_ERROR,
  ADD_SIDE_EFFECT_BY_USER,
  ADD_SIDE_EFFECT_BY_USER_ERROR,
  DELETE_SIDE_EFFECT_BY_USER,
  DELETE_SIDE_EFFECT_BY_USER_ERROR,
} from "./types.js";

export const getRoles = () => async (dispatch) => {
  try {
    const res = await axios.get("/users/getRoles");

    dispatch({
      type: ROLES_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ROLES_LOADED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

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

export const getSideEffectsListByUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/users/getSideEffectsListByUser");

    dispatch({
      type: SIDE_EFFECTS_BY_USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SIDE_EFFECTS_BY_USER_LOADED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addSideEffectByUser = (sideEffectInfo = {}) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(sideEffectInfo);
  try {
    const res = await axios.put("/users/addSideEffectByUser", body, config);

    dispatch({
      type: ADD_SIDE_EFFECT_BY_USER,
      payload: res.data,
    });
    dispatch(setAlert({ msg: "Side effect added", alertType: "success" }));
  } catch (err) {
    dispatch({
      type: ADD_SIDE_EFFECT_BY_USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert({ msg: "Side effect not added", alertType: "danger" }));
  }
};

export const deleteSideEffectByUser = (sideEffectId = "") => async (
  dispatch
) => {
  try {
    const res = await axios.delete(
      `/users/deleteSideEffectByUser/${sideEffectId}`
    );

    dispatch({
      type: DELETE_SIDE_EFFECT_BY_USER,
      payload: res.data,
    });
    dispatch(setAlert({ msg: "Side effect deleted", alertType: "success" }));
  } catch (err) {
    dispatch({
      type: DELETE_SIDE_EFFECT_BY_USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert({ msg: "Side effect not deleted", alertType: "danger" }));
  }
};
