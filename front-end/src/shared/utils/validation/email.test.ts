import { describe, expect, test } from "vitest";
import { validateEmail } from "./email";

describe("Email validation", () => {
  test("an empty input should not be valid.", () => {
    expect(validateEmail("")).toEqual(false);
  });

  const validEmail = "jon@gmail.com";
  test("it should have an @ symbol", () => {
    expect(validEmail.includes("@")).toEqual(true);
  });

  test("it should have an . symbol", () => {
    expect(validEmail.includes(".")).toEqual(true);
  });

  test("a valid email should pass validation", () => {
    expect(validateEmail(validEmail)).toEqual(true);
  });

  test("an invalid email should not pass validation", () => {
    expect(validateEmail("jon@gmail")).toEqual(false);
  });
});
