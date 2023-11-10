'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import { ValidationError } from '../../../utils/validations/validation-error';
import { validationSchema } from '../../../utils/validations/validation-schema';
import { getValidationError } from '../../../utils/validations/get-validation-error';

import { users } from '../../../services/constants/login-data';

import LoginService, { LoginPayload } from '../../../services/login-service';
import useUserStore, { UseUserStoreInterface } from '../../../store/user-store';
import useUsersListStore, { UseUsersListStoreInterface } from '../../../store/users-list-store';

import Snackbar from '../../../components/snackbar';

const LoginForm = ({ loginLocale }: { loginLocale: Record<string, string> }) => {
  const router = useRouter();

  const setUser = useUserStore((state: UseUserStoreInterface) => state.setUser);
  const setUsers = useUsersListStore((state: UseUsersListStoreInterface) => state.setUsers)

  const [loading, setLoading] = useState<boolean>(false);
  const [branchId, setBranchId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [submitError, setSubmitError] = useState<string | undefined>();
  const [inputError, setInputError] = useState<ValidationError>();

  const inputsNotEmpty = [branchId, username, password].every((input) => Boolean(input.length));

  const maySubmit = !loading && !inputError && inputsNotEmpty;
  const buttonLabel = loading ? loginLocale['button.authenticating'] : loginLocale['button.login'];

  const inputs = [
    {
      id: 'branchId',
      type: 'text',
      label: loginLocale['input.label.branch-id'],
      placeholder: loginLocale['input.placeholder.branch-id'],
      value: branchId,
      inputErrorType: ValidationError.Number,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target || {};
        setSubmitError(undefined);
        setBranchId(event.target.value);
        const result = validationSchema.number.safeParse(value);
        const branchIdInputError = getValidationError(result, [ValidationError.Number]);
        setInputError(branchIdInputError);
      },
      inputTestId: 'branchid-input',
      errorTestid: 'branchid-error'
    },
    {
      id: 'username',
      type: 'text',
      inputErrorType: ValidationError.NoSpecialCharacter,
      label: loginLocale['input.label.username'],
      placeholder: loginLocale['input.placeholder.username'],
      value: username,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target || {};
        setSubmitError(undefined);
        setUsername(value);
        const result = validationSchema.noSpecialCharacter.safeParse(value);
        const newUsernameInputError = getValidationError(result, [
          ValidationError.NoSpecialCharacter
        ]);
        setInputError(newUsernameInputError);
      },
      inputTestId: 'username-input',
      errorTestid: 'username-error'
    },
    {
      id: 'password',
      type: 'password',
      label: loginLocale['input.label.password'],
      placeholder: loginLocale['input.placeholder.password'],
      value: password,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setSubmitError(undefined);
        setPassword(event.target.value);
      },
      inputTestId: 'password-input',
      errorTestid: 'password-error'
    }
  ];

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFocus = () => {
    setSubmitError(undefined);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setSubmitError(undefined);

    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const formDataObject = Object.fromEntries(formData.entries()) as unknown as LoginPayload;
      const response = await LoginService.post(formDataObject);

      if (response.status === 200) {
        const { user } = response;
        setUsers(users);
        setUser(user);
        router.replace('/dashboard');
      }
    } catch(_) {
      setSubmitError(loginLocale["request.login.error.generic"]);
    }
    setLoading(false);
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit} data-testid="login-form">
      {inputs.map((input) => {
        const {
          id,
          type,
          label,
          placeholder,
          value,
          onChange,
          inputErrorType,
          inputTestId,
          errorTestid
        } = input;
        let inputClassName = 'p-4 w-full rounded-md';
        let inputType = type;
        let icon;

        const hasInputError = inputError && inputError === inputErrorType;
        const hasError = hasInputError || submitError;
        if (hasError) {
          inputClassName = `${inputClassName} bg-cienna-10`;
        }

        if (type === 'password') {
          const showPasswordLabel = showPassword
            ? loginLocale['input.password.hide']
            : loginLocale['input.password.show'];
          inputType = showPassword ? 'text' : 'password';
          icon = (
            <button type="button" onClick={handleShowPassword}>
              <p
                className="absolute right-0 top-[10px] m-2 before:text-black-40 text-xs"
              >
                {showPasswordLabel}
              </p>
            </button>
          );
          inputClassName = `${inputClassName} pr-8`;
        }
        return (
          <label key={id} htmlFor={id} className="flex flex-col mb-4">
            <span className="font-medium mb-1">{label}</span>
            <div className="relative" onFocus={handleFocus}>
              <input
                name={id}
                aria-labelledby={id}
                type={inputType}
                required
                autoComplete="off"
                placeholder={placeholder}
                className={inputClassName}
                disabled={loading}
                value={value}
                onChange={onChange}
                data-testid={inputTestId}
              />
              {icon}
            </div>
            {inputErrorType === inputError && (
              <span className="font-medium text-sm text-cienna-100 mt-1" id={errorTestid}>
                {loginLocale[`validation.${inputError}`]}
              </span>
            )}
          </label>
        );
      })}
      <button
        type="submit"
        disabled={!maySubmit}
        className="bg-blue-100 mb-4 w-full py-2 rounded-md"
        data-testid="login-bttn"
      >
        {buttonLabel}
      </button>
      {/* Only displaying generic errors since it is good security practice */}
      {/* Displaying generic errors such as invalid branch ID, username, or password allows for brute-forcing */}
      {submitError && (
        <div id="submit-error">
          <Snackbar message={submitError} />
        </div>
      )}
    </form>
  );
}

export default LoginForm;