import { useState, FormEvent, ChangeEvent, MouseEvent } from 'react';

import { UserType } from '../../../services/login-service';

import { ValidationError } from '../../../utils/validations/validation-error';
import { validationSchema } from '../../../utils/validations/validation-schema';
import { getValidationError } from '../../../utils/validations/get-validation-error';

import useUsersListStore, { UseUsersListStoreInterface } from '../../../store/users-list-store';

import Snackbar from '../../../components/snackbar';

interface DashboardFormProps {
  dashboardLocale: Record<string, string>;
  users: UserType[];
}

const DashboardForm = (props: DashboardFormProps) => {
  const { dashboardLocale, users } = props;

  const setNewUser = useUsersListStore((state: UseUsersListStoreInterface) => state.setNewUser);

  const [loading, setLoading] = useState<boolean>(false);

  const [branchId, setBranchId] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [middleName, setMiddleName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [branchIdError, setBranchIdError] = useState<string>();
  const [firstNameError, setFirstNameError] = useState<string>();
  const [middleNameError, setMiddleNameError] = useState<string>();
  const [lastNameError, setLastNameError] = useState<string>();
  const [positionError, setPositionError] = useState<string>();
  const [usernameError, setUsernameError] = useState<string>();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [submitError, setSubmitError] = useState<string>();

  const inputsNotEmpty = [
    branchId,
    username,
    firstName,
    middleName,
    lastName,
    position,
    password
  ].every((input) => Boolean(input.length));

  const maySubmit = !loading && inputsNotEmpty && !branchIdError && !firstNameError &&
    !middleNameError && !lastNameError && !positionError;

  const validationErrorMap: Record<string, string> = {
    [ValidationError.Empty]: dashboardLocale['validation.empty'],
    [ValidationError.LettersOnly]: dashboardLocale['validation.letters-only'],
    [ValidationError.Number]: dashboardLocale['validation.numbers-only'],
    [ValidationError.NoSpecialCharacter]: dashboardLocale['validation.no-special-characters'],
  };

  const buttonLabel = loading
    ? dashboardLocale['button.loading']
    : dashboardLocale['button.add'];

  const inputs = [
    {
      id: 'branchId',
      type: 'text',
      label: dashboardLocale['input.label.branch-id'],
      submitErrorType: ValidationError.Number,
      placeholder: dashboardLocale['input.placeholder.branch-id'],
      value: branchId,
      inputErrorType: ValidationError.Number,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target || {};
        setBranchId(event.target.value);
        const result = validationSchema.number.safeParse(value);
        const branchIdInputError = getValidationError(result, [ValidationError.Number]);
        setSubmitError(undefined);
        setBranchIdError(branchIdInputError);
      }
    },
    {
      id: 'userName',
      type: 'text',
      submitErrorType: ValidationError.NoSpecialCharacter,
      inputErrorType: ValidationError.NoSpecialCharacter,
      label: dashboardLocale['input.label.username'],
      placeholder: dashboardLocale['input.placeholder.username'],
      value: username,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target || {};
        setUsername(value);
        const result = validationSchema.noSpecialCharacter.safeParse(value);
        const newUsernameInputError = getValidationError(result, [
          ValidationError.NoSpecialCharacter
        ]);
        setSubmitError(undefined);
        setUsernameError(newUsernameInputError);
      }
    },
    {
      id: 'firstName',
      type: 'text',
      submitErrorType: ValidationError.LettersOnly,
      label: dashboardLocale['input.label.firstname'],
      placeholder: dashboardLocale['input.placeholder.firstname'],
      value: firstName,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target || {};
        setFirstName(value);
        const result = validationSchema.lettersOnly.safeParse(value);
        const firstNameError = getValidationError(result, [ValidationError.LettersOnly]);
        setSubmitError(undefined);
        setFirstNameError(firstNameError);
      }
    },
    {
      id: 'middleName',
      type: 'text',
      submitErrorType: ValidationError.LettersOnly,
      label: dashboardLocale['input.label.middlename'],
      placeholder: dashboardLocale['input.placeholder.middlename'],
      value: middleName,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target || {};
        setMiddleName(value);
        const result = validationSchema.lettersOnly.safeParse(value);
        const middleNameError = getValidationError(result, [ValidationError.LettersOnly]);
        setSubmitError(undefined);
        setMiddleNameError(middleNameError);
      }
    },
    {
      id: 'lastName',
      type: 'text',
      submitErrorType: ValidationError.LettersOnly,
      label: dashboardLocale['input.label.lastname'],
      placeholder: dashboardLocale['input.placeholder.lastname'],
      value: lastName,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target || {};
        setLastName(value);
        const result = validationSchema.lettersOnly.safeParse(value);
        const lastNameError = getValidationError(result, [ValidationError.LettersOnly]);
        setSubmitError(undefined);
        setLastNameError(lastNameError);
      }
    },
    {
      id: 'position',
      type: 'text',
      submitErrorType: ValidationError.LettersOnly,
      label: dashboardLocale['input.label.position'],
      placeholder: dashboardLocale['input.placeholder.position'],
      value: position,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target || {};
        setPosition(value);
        const result = validationSchema.lettersOnly.safeParse(value);
        const positionError = getValidationError(result, [ValidationError.LettersOnly]);
        setSubmitError(undefined);
        setPositionError(positionError);
      }
    },
    {
      id: 'password',
      type: 'password',
      submitErrorType: ValidationError.Empty,
      label: dashboardLocale['input.label.password'],
      placeholder: dashboardLocale['input.placeholder.password'],
      value: password,
      onChange: (event: ChangeEvent<HTMLInputElement>) => {
        setSubmitError(undefined);
        setPassword(event.target.value);
      }
    }
  ];

  const checkUsername = (username: string) => {
    return users.find((user) => {
      if (user.userName === username) {
        return true;
      }
      return false;
    });
  }

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleResetForm = (event: MouseEvent<HTMLButtonElement> | FormEvent) => {
    event.preventDefault();
    setBranchId('');
    setUsername('');
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setPosition('');
    setPassword('');
    setBranchIdError(undefined);
    setUsernameError(undefined);
    setFirstNameError(undefined);
    setLastNameError(undefined);
    setMiddleNameError(undefined);
    setPositionError(undefined);
    setSubmitError(undefined);
  };

  const handleFocus = () => {
    setSubmitError(undefined);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target as HTMLFormElement);
    const formDataObject = Object.fromEntries(formData.entries()) as unknown as UserType;

    if (checkUsername(username)) {
      setLoading(false); 
      setSubmitError(dashboardLocale["validation.username-already-exists"]);
      return;
    } else {
      const newUser = {
        branchId: Number(formDataObject.branchId),
        userName: formDataObject.userName,
        firstName: formDataObject.firstName,
        middleName: formDataObject.middleName,
        lastName: formDataObject.lastName,
        position: formDataObject.position,
        password: formDataObject.password
      };
      setNewUser(newUser);
    }

    handleResetForm(event);
    setLoading(false); 
  }

  const getInputError = (id: string) => {
    switch (id) {
      case 'branchId': return branchIdError;
      case 'firstName': return firstNameError;
      case 'lastName': return lastNameError;
      case 'middleName': return middleNameError;
      case 'userName': return usernameError;
      case 'position': return positionError;
      default: return usernameError;
    }
  }

  return (
    <form className="flex flex-col rounded-md p-4 w-full bg-gray-100" onSubmit={handleSubmit}>
      <div onFocus={handleFocus}>
        {inputs.map((input) => {
          const { id, type, submitErrorType, label, placeholder, value, onChange, inputErrorType } =
            input;
          let inputClassName = 'p-2 w-full rounded-md';
          let inputType = type;
          let icon;

          const hasInputError = getInputError(id);
          const hasSubmitError = submitError && submitError === submitErrorType;
          const hasError = hasInputError || hasSubmitError;
          if (hasError) {
            inputClassName = `${inputClassName} bg-cienna-10`;
          }

          if (type === 'password') {
            const showPasswordLabel = showPassword
              ? dashboardLocale['input.password.hide']
              : dashboardLocale['input.password.show'];
            inputType = showPassword ? 'text' : 'password';
            icon = (
              <button type="button" onClick={handleShowPassword} data-testid="password-bttn">
                <p
                  className="absolute right-0 top-[5px] m-2 before:text-black-40 text-xs"
                  data-testid="password-label"
                >
                  {showPasswordLabel}
                </p>
              </button>
            );
            inputClassName = `${inputClassName} pr-8`;
          }
          return (
            <label key={id} htmlFor={id} className="flex flex-col mb-4">
              <span className="font-medium text-black-70 mb-1">{label}</span>
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
                />
                {icon}
              </div>
              {hasInputError && (
                <span className="font-medium text-sm text-red-500 mt-1">
                  {validationErrorMap[`${hasInputError}`]}
                </span>
              )}
            </label>
          );
        })}
        <div className="flex justify-end ">
          <div className="w-2/6 flex">
            <button
              type="button"
              onClick={handleResetForm}
              className="bg-blue-100 w-full py-2 mr-2 rounded-md"
            >
              {dashboardLocale['button.reset']}
            </button>
            <button
              type="submit"
              disabled={!maySubmit}
              className="bg-blue-100 w-full py-2 rounded-md"
            >
              {buttonLabel}
            </button>
          </div>
        </div>

        {submitError && (
          <div id="submit-error" className="my-2">
            <Snackbar message={submitError} />
          </div>
        )}
      </div>
    </form>
  );
}

export default DashboardForm;