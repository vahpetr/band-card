import { cardReducer, initialState } from "./reducers";
import { bondDataFething, bondDataSucceed, bondDataFailed } from "./actions";
import { ValueType } from "./types";

describe("card reducer", () => {
  it("should return the initial state", () => {
    expect(cardReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle BOND_DATA_FETCHING", () => {
    const action = bondDataFething({
      isin: "test1",
      valueType: ValueType.SPREAD
    });
    const newState = {
      data: [],
      error: null,
      filter: { isin: "test1", valueType: ValueType.SPREAD }
    };
    expect(cardReducer(initialState, action).bond).toEqual(newState);
  });

  it("should handle BOND_DATA_SUCCEED", () => {
    const result = {
      data: [3, 2, 1]
    };
    const action = bondDataSucceed(result);
    const newState = {
      data: result.data,
      error: null,
      filter: { isin: "test1", valueType: ValueType.SPREAD }
    };
    expect(cardReducer(initialState, action).bond).toEqual(newState);
  });

  it("should handle BOND_DATA_FAILED", () => {
    const error = "My error"
    const action = bondDataFailed(error);
    const newState = {
      data: [],
      error: error,
      filter: { isin: "test1", valueType: ValueType.SPREAD }
    };
    expect(cardReducer(initialState, action).bond).toEqual(newState);
  });
});
