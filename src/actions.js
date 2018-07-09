// @ts-check

export const BOND_DATA_FETCHING = "BOND_DATA_FETCHING";
export const BOND_DATA_SUCCEED = "BOND_DATA_SUCCEED";
export const BOND_DATA_FAILED = "BOND_DATA_FAILED";

export function bondDataFething(filter) {
  return {
    type: BOND_DATA_FETCHING,
    payload: filter
  };
}

export function bondDataSucceed(data) {
  return {
    type: BOND_DATA_SUCCEED,
    payload: data
  };
}

export function bondDataFailed(error) {
  return {
    type: BOND_DATA_FAILED,
    payload: error
  };
}