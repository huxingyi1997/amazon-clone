import { describe, expect, test } from "vitest";
import { validateNameLength, validatePasswordLength } from "./length";

describe("Field length validation", () => {
  describe("Name field", () => {
    test("a name should fail length validation if it is not set", () => {
      expect(validateNameLength("")).toEqual(false);
    });

    test("a name should fail length validation if it is less than 2 characters", () => {
      expect(validateNameLength("J")).toEqual(false);
    });

    test("a name should pass length validation if it is 2 characters", () => {
      expect(validateNameLength("Jo")).toEqual(true);
    });

    test("a name should pass length validation if it is more than 2 characters", () => {
      expect(validateNameLength("Jon")).toEqual(true);
    });
  });

  describe("Password field validation", () => {
    test("a password should fail length validation if it is not set", () => {
      expect(validatePasswordLength("")).toEqual(false);
    });

    test("a password should fail length validation if it is less than 2 characters", () => {
      expect(validatePasswordLength("J")).toEqual(false);
    });

    test("a password should fail length validation if it is more than 20 characters", () => {
      expect(validatePasswordLength("qwertyuiopqwertyuiopqwertyuiop")).toEqual(
        false
      );
    });

    test("a password should pass length validation if it is 6-20 characters", () => {
      expect(validatePasswordLength("password")).toEqual(true);
    });
  });
});
