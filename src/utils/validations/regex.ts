import { z } from 'zod';

export const regex: Record<string, RegExp> = {
  number: /^[0-9]+$/,
  specialCharacter: /[!@#$%^&*(),.?":{}|<>]/,
  lettersOnly: /[^a-zA-Z ]+/,
};

export const regexValidator = (
  regexValidator: RegExp,
  errorMessage: string
): Record<string, z.ZodTypeAny> => {
  return {
    match: z.string().refine((value: string) => {
      return regexValidator.test(value);
    }, errorMessage)
  };
};
