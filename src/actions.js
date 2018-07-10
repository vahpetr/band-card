// @ts-check

export const BOND_DATA_FETCHING = "BOND_DATA_FETCHING";
export const BOND_DATA_SUCCEED = "BOND_DATA_SUCCEED";
export const BOND_DATA_FAILED = "BOND_DATA_FAILED";

/**
 * Fetch bond data
 */
export function bondDataFething(filter) {
  return {
    type: BOND_DATA_FETCHING,
    payload: filter
  };
}

/**
 * Fetch bond data success
 * @param {number[]} data
 */
export function bondDataSucceed(data) {
  return {
    type: BOND_DATA_SUCCEED,
    payload: data
  };
}

/**
 * Fetch bond data error
 * @param {string} error
 */
export function bondDataFailed(error) {
  return {
    type: BOND_DATA_FAILED,
    payload: error
  };
}
