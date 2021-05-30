import axios from "axios";
import {
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  USER_LOADED,
  SIGN_OUT,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  AUTH_ERROR,
} from "./types.js";
import { setAlert } from "./alerts";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.get("/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const signIn = ({ email = "", password = "" }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/auth", body, config);
    dispatch({
      type: SIGNIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
    dispatch(setAlert({ msg: "Signed in", alertType: "success" }));
  } catch (err) {
    dispatch({
      type: SIGNIN_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(
      setAlert({
        msg: "Please enter the correct email and password",
        alertType: "danger",
      })
    );
  }
};

export const signOut = () => (dispatch) => {
  dispatch({ type: SIGN_OUT });
  dispatch(setAlert({ msg: "Signed out", alertType: "success" }));
};

export const signUp = (user = {}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(user);

  try {
    const res = await axios.post("/users", body, config);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
    dispatch(setAlert({ msg: "Signed up", alertType: "success" }));
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert({ msg: "User already exists", alertType: "danger" }));
  }
};
