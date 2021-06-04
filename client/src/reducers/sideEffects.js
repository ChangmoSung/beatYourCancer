import {
  SIDE_EFFECTS_BY_ADMIN_LOADED,
  SIDE_EFFECTS_BY_ADMIN_LOADED_ERROR,
  ADD_SIDE_EFFECT_BY_ADMIN,
  ADD_SIDE_EFFECT_BY_ADMIN_ERROR,
  DELETE_SIDE_EFFECT_BY_ADMIN,
  DELETE_SIDE_EFFECT_BY_ADMIN_ERROR,
} from "../actions/types";

const initialState = {
  sideEffectsListByAdmin: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SIDE_EFFECTS_BY_ADMIN_LOADED:
    case ADD_SIDE_EFFECT_BY_ADMIN:
    case DELETE_SIDE_EFFECT_BY_ADMIN:
      return {
        ...state,
        sideEffectsListByAdmin: payload,
        loading: false,
      };
    case SIDE_EFFECTS_BY_ADMIN_LOADED_ERROR:
    case ADD_SIDE_EFFECT_BY_ADMIN_ERROR:
    case DELETE_SIDE_EFFECT_BY_ADMIN_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
