// @ts-check

import { ValueType } from "./types";

export const fetchBondData = filter =>
  fakeFetchBondData("//fakeapi.bond.com", filter);

const fakeFetchBondData = (_, filter) =>
  new Promise((resolve, reject) => {
    window.setTimeout(() => {
      try {
        const data = generateBondData(filter);
        resolve({ data });
      } catch (ex) {
        reject(ex.message);
      }
    }, 0);
  });

const rnd = (min, max) => Math.random() * (max - min) + min;

const generateBondData = filter => {
  const fillYield = (_, index) => rnd(20, 30) + Math.log(index);
  const fillSpread = (_, index) => rnd(2, 4) + index / 30;
  const fillPrice = (_, index) => rnd(60, 80) + index;

  const getMapper = valueType => {
    switch (valueType) {
      case ValueType.YIELD:
        return fillYield;
      case ValueType.SPREAD:
        return fillSpread;
      case ValueType.PRICE:
        return fillPrice;
      default:
        throw new Error(`Bound query not supported ${valueType} value type.`);
    }
  };

  const mapper = getMapper(filter.valueType);
  const data = Array(70 * 3)
    .fill(undefined)
    .map(mapper);

  return data;
};
