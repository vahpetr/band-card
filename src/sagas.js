// @ts-check

import { call, put, takeLatest, all } from "redux-saga/effects";
import { fetchBondData } from "./api";
import { BOND_DATA_FETCHING, bondDataSucceed, bondDataFailed } from "./actions";

/**
 * Bond Data fetch sage pipeline
 */
export function* bondDataFetchSaga(action) {
  try {
    const result = yield call(fetchBondData, action.payload);
    yield put(bondDataSucceed(result));
  } catch (ex) {
    yield put(bondDataFailed(ex.message));
  }
}

/**
 * App root saga. All combined sagas
 */
export function* appRootSaga() {
  yield all([takeLatest(BOND_DATA_FETCHING, bondDataFetchSaga)]);
}
