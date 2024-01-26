import getRoman from "./roman";
import {getDigits} from "./roman";

test("basic test for 1", () => {
  expect(getRoman(1)).toBe("I");
});

test("basic test for 3", () => {
  expect(getRoman(3)).toBe("III");
});

test("basic test for 4", () => {
  expect(getRoman(4)).toBe("IV");
});

test("basic test for 5", () => {
  expect(getRoman(5)).toBe("V");
});

test("basic test for 7", () => {
  expect(getRoman(7)).toBe("VII");
});

test("basic test for 9", () => {
  expect(getRoman(9)).toBe("IX");
});

test("basic test for 10", () => {
  expect(getRoman(10)).toBe("X");
});

test("basic test for 0", () => {
  expect(getRoman(0)).toBe("");
});

test("basic test for 12", () => {
  expect(getRoman(12)).toBe("XII");
});

test("basic test for 123", () => {
  expect(getRoman(123)).toBe("CXXIII");
});

test("basic test for 101", () => {
  expect(getRoman(101)).toBe("CI");
});


test("basic test for 1234", () => {
  expect(getRoman(1234)).toBe("MCCXXXIV");
});

test("12 => array 1 2", () => {
  expect(getDigits(12)).toEqual([1,2]);
})

// test("basic test for 17", () => {
//   expect(getRoman(17)).toBe("XVII");
// });

// test("basic test for 99", () => {
//   expect(getRoman(99)).toBe("LXLIX");
// });
