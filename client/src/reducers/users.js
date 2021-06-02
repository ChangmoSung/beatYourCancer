import {
  FOODS_LOADED,
  FOODS_LOADED_ERROR,
  ADD_FOOD,
  ADD_FOOD_ERROR,
  DELETE_FOOD,
  DELETE_FOOD_ERROR,
} from "../actions/types";

const initialState = {
  foodsList: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FOODS_LOADED:
    case ADD_FOOD:
    case DELETE_FOOD:
      return {
        ...state,
        foodsList: payload,
        loading: false,
      };
    case FOODS_LOADED_ERROR:
    case ADD_FOOD_ERROR:
    case DELETE_FOOD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
