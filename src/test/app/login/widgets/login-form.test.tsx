import React from 'react';
import { test, expect, describe, afterEach, vi } from 'vitest';
import { render, cleanup, fireEvent } from '@testing-library/react';

import LoginForm from '../../../../app/login/widgets/login-form';
import locales from '../../../../locales/en.json';

const testId = {
  loginForm: 'login-form',
  loginButton: 'login-bttn',
  branchIdInput: 'branchid-input',
  userNameInput: 'username-input',
  passwordInput: 'password-input',
};

afterEach(() => {
  cleanup();
});

vi.mock('next/navigation', () => ({ useRouter: vi.fn() }));

describe('login form', () => {
  test('should render component', () => {
    const { getByTestId } = render(<LoginForm loginLocale={locales.login} />);
    const loginForm = getByTestId(testId.loginForm) as HTMLFormElement;
    expect(loginForm).toBeDefined();
  });

  test('should show error message when input conditions are not met', () => {
    const { getByTestId, container } = render(<LoginForm loginLocale={locales.login} />);
    const branchIdInput = getByTestId(testId.branchIdInput) as HTMLInputElement;
    const branchIdError = container.querySelector('#branchid-error') as HTMLSpanElement;

    const userNameInput = getByTestId(testId.userNameInput) as HTMLInputElement;
    const userNameError = container.querySelector('#username-error') as HTMLSpanElement;

    fireEvent.change(branchIdInput, { target: { value: 'invalid' } });
    fireEvent.change(userNameInput, { target: { value: 'inv@lid!' } });

    expect(branchIdError).toBeDefined();
    expect(userNameError).toBeDefined();
  });

  test('should have a disabled login button when inputs are empty', () => {
    const { getByTestId } = render(<LoginForm loginLocale={locales.login} />);
    const branchIdInput = getByTestId(testId.branchIdInput) as HTMLInputElement;
    const userNameInput = getByTestId(testId.userNameInput) as HTMLInputElement;
    const passwordInput = getByTestId(testId.passwordInput) as HTMLInputElement;
    const loginButton = getByTestId(testId.loginButton) as HTMLButtonElement;

    fireEvent.change(branchIdInput, { target: { value: '' } });
    fireEvent.change(userNameInput, { target: { value: '' } });
    fireEvent.change(passwordInput, { target: { value: '' } });

    expect(loginButton.disabled).toBe(true);
  });
});
