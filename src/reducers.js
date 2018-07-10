// @ts-check

import { combineReducers } from "redux";
import {
  BOND_DATA_FETCHING,
  BOND_DATA_SUCCEED,
  BOND_DATA_FAILED
} from "./actions";
import { ValueType } from "./types";

/**
 * App initial state
 */
export const initialState = Object.freeze({
  bond: {
    filter: {
      isin: "RU000A0JU4L3",
      valueType: ValueType.PRICE
    },
    data: [],
    error: null
  }
});

/**
 * Card reducer
 */
export function cardReducer(state = initialState, action) {
  switch (action.type) {
    case BOND_DATA_FETCHING: {
      const newState = { ...state };
      const newFilter = { ...newState.bond.filter, ...action.payload };
      newState.bond.filter = newFilter;
      return newState;
    }
    case BOND_DATA_SUCCEED: {
      const newState = { ...state };
      newState.bond.data = action.payload.data;
      newState.bond.error = null;
      return newState;
    }
    case BOND_DATA_FAILED: {
      const newState = { ...state };
      newState.bond.data = [];
      newState.bond.error = action.payload;
      return newState;
    }
    default: {
      return state;
    }
  }
}

/**
 * App reducer. All combinded reducers
 */
export const appReducers = combineReducers({
  cardReducer
});
