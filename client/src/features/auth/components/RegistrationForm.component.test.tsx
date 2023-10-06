import { describe, expect, test, beforeEach } from "vitest";

import { reducer, screen } from '../../../shared/utils/test-utils';
import RegistrationFormComponent from './RegistrationForm.component';

describe('Registration Form', () => {
  let registrationButton: HTMLElement | null = null;

  beforeEach(() => {
    reducer(<RegistrationFormComponent />);
    registrationButton = screen.getByRole('button', { name: /register/i });
  });

  test('The registration button should be in the document', () => {
    expect(registrationButton);
  });

  test('The registration button should initially be disabled', () => {
    expect(registrationButton).toHaveProperty("disabled");
  });
});
