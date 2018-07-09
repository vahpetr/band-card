// saga unit-testing https://redux-saga-test-plan.jeremyfairbank.com/unit-testing/
// redux-saga-test-plan https://github.com/jfairbank/redux-saga-test-plan

import { testSaga } from "redux-saga-test-plan";
import { fetchBondData } from "./api";
import { bondDataFetchSaga } from "./sagas";
import { bondDataFething, bondDataSucceed, bondDataFailed } from "./actions";
import { ValueType } from "./types";

describe("Bond data fetch saga", () => {
  const action = bondDataFething({
    isin: "test",
    valueType: ValueType.PRICE
  });

  it("try", () => {
    const result = {
      data: [1, 2, 3]
    };
    testSaga(bondDataFetchSaga, action)
      .next()
      .call(fetchBondData, action.payload)
      .next(result)
      .put(bondDataSucceed(result))
      .next()
      .isDone();
  });

  it("catch", () => {
    const error = new Error("My error");
    testSaga(bondDataFetchSaga, action)
      .next()
      .throw(error)
      .put(bondDataFailed(error.message))
      .next()
      .isDone();
  });
});
