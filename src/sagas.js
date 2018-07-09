// @ts-check

import { call, put, takeLatest, all } from "redux-saga/effects";
import { fetchBondData } from "./api";
import {
  BOND_DATA_FETCHING,
  bondDataSucceed,
  bondDataFailed
} from "./actions";

export function* bondDataFetchSaga(action) {
  try {
    const result = yield call(fetchBondData, action.payload);
    yield put(bondDataSucceed(result));
  } catch (ex) {
    yield put(bondDataFailed(ex.message));
  }
}

export function* appRootSaga() {
  yield all([
    takeLatest(BOND_DATA_FETCHING, bondDataFetchSaga)
  ]);
}
