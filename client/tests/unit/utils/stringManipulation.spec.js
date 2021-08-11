import { getFloatArrayFromString } from "@/utils/stringManipulation";

describe("getFloatArrayFromString function", () => {
  test("works for cleanly formatted input", () => {
    const res = getFloatArrayFromString("10, 11, 12");
    expect(res).toStrictEqual([10, 11, 12]);
  });
  test("works for roughly formatted input", () => {
    const res = getFloatArrayFromString("xxyw10,sdfasdfadsfasdf 11,%%% 12.0");
    expect(res).toStrictEqual([10, 11, 12]);
  });
});
