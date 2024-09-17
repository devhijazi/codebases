export const employeeForgotPasswordValidationConfig = {
  type: 'employee-forgot-password-validation',
  minutesToExpires: 1 * 24 * 60, // 1 DIA,
  tokenLength: 64,
} as const;
