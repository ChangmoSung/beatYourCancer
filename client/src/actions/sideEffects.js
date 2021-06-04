import axios from "axios";
import { setAlert } from "./alerts";
import {
  SIDE_EFFECTS_BY_ADMIN_LOADED,
  SIDE_EFFECTS_BY_ADMIN_LOADED_ERROR,
  ADD_SIDE_EFFECT_BY_ADMIN,
  ADD_SIDE_EFFECT_BY_ADMIN_ERROR,
  DELETE_SIDE_EFFECT_BY_ADMIN,
  DELETE_SIDE_EFFECT_BY_ADMIN_ERROR,
} from "./types.js";

export const getSideEffectsListByAdmin = () => async (dispatch) => {
  try {
    const res = await axios.get("/sideEffects/getSideEffectsListByAdmin");

    dispatch({
      type: SIDE_EFFECTS_BY_ADMIN_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SIDE_EFFECTS_BY_ADMIN_LOADED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addSideEffectByAdmin = (sideEffectInfoByAdmin = {}) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(sideEffectInfoByAdmin);
  try {
    const res = await axios.put(
      "/sideEffects/addSideEffectByAdmin",
      body,
      config
    );

    dispatch({
      type: ADD_SIDE_EFFECT_BY_ADMIN,
      payload: res.data,
    });
    dispatch(
      setAlert({ msg: "Side effect added by admin", alertType: "success" })
    );
  } catch (err) {
    dispatch({
      type: ADD_SIDE_EFFECT_BY_ADMIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(
      setAlert({ msg: "Side effect not added by admin", alertType: "danger" })
    );
  }
};

export const deleteSideEffectByAdmin = (sideEffectIdByAdmin = "") => async (
  dispatch
) => {
  try {
    const res = await axios.delete(
      `/sideEffects/deleteSideEffectByAdmin/${sideEffectIdByAdmin}`
    );

    dispatch({
      type: DELETE_SIDE_EFFECT_BY_ADMIN,
      payload: res.data,
    });
    dispatch(
      setAlert({ msg: "Side effect deleted by admin", alertType: "success" })
    );
  } catch (err) {
    dispatch({
      type: DELETE_SIDE_EFFECT_BY_ADMIN_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(
      setAlert({ msg: "Side effect not deleted by admin", alertType: "danger" })
    );
  }
};
