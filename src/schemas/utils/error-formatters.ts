import { ZodError } from 'zod';

export type ErrorMap = Record<string, string>;

export const formatZodErrors = (error: ZodError): ErrorMap => {
  const formattedErrors: ErrorMap = {};

  for (const issue of error.issues) {
    const path = issue.path.join('.');
    if (path && !formattedErrors[path]) {
      formattedErrors[path] = issue.message;
    }
  }

  return formattedErrors;
};
