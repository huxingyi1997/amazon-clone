import { describe, expect, test, beforeEach } from "vitest";

import { reducer, screen } from "../../../shared/utils/test-utils";
import SigninFormComponent from "./SigninForm.component";

describe("Sign-in Form", () => {
  let signInButton: HTMLElement | null = null;

  beforeEach(() => {
    reducer(<SigninFormComponent />);
    signInButton = screen.getByRole("button", { name: /sign-in/i });
  });

  test("The login button should be in the document", () => {
    expect(signInButton);
  });

  test("The login button should initially be disabled", () => {
    expect(signInButton).toHaveProperty("disabled");
  });
});
