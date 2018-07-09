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
    await expect(task).rejects.toThrowErrorMatchingSnapshot();
  });
});
