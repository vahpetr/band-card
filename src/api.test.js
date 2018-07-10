import { ValueType } from "./types";
import { fetchBondData } from "./api";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

describe("Fetch bond data api", () => {
  it("should return result", async () => {
    const result = await fetchBondData({
      valueType: ValueType.SPREAD
    });
    expect(result.data.length).toBe(210);
  });

  it("should be throw exception", async () => {
    expect.assertions(1);
    const task = fetchBondData({
      valueType: "fake"
    });

    // not work correctly on jest less 22.4.3 version
    // hello not ejected create-react-app https://github.com/facebook/jest/issues/4946
    await expect(task).rejects.toThrowErrorMatchingSnapshot();
  });
});
