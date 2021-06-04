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
} from "../actions/types";

const initialState = {
  roles: [],
  foodsList: [],
  sideEffectsListByUser: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ROLES_LOADED:
      return {
        ...state,
        roles: payload,
        loading: false,
      };
    case FOODS_LOADED:
    case ADD_FOOD:
    case DELETE_FOOD:
      return {
        ...state,
        foodsList: payload,
        loading: false,
      };
    case SIDE_EFFECTS_BY_USER_LOADED:
    case ADD_SIDE_EFFECT_BY_USER:
    case DELETE_SIDE_EFFECT_BY_USER:
      return {
        ...state,
        sideEffectsListByUser: payload,
        loading: false,
      };
    case ROLES_LOADED_ERROR:
    case FOODS_LOADED_ERROR:
    case ADD_FOOD_ERROR:
    case DELETE_FOOD_ERROR:
    case SIDE_EFFECTS_BY_USER_LOADED_ERROR:
    case ADD_SIDE_EFFECT_BY_USER_ERROR:
    case DELETE_SIDE_EFFECT_BY_USER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
