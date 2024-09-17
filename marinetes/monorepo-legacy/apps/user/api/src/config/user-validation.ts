export const userValidationConfig = {
  type: 'user-email-validation',
  minutesToExpires: 10, // 10 MINUTOS
  codeSize: 5,
} as const;

export const userPasswordChangeValidationConfig = {
  type: 'user-password-change-validation',
  minutesToExpires: 10, // 10 MINUTOS,
  codeSize: 5,
} as const;

export const userFirstPasswordSetValidationConfig = {
  type: 'user-first-password-set-validation',
  minutesToExpires: 10 * 24 * 60, // 10 DIAS,
} as const;

export const userForgotPasswordValidationConfig = {
  type: 'user-forgot-password-validation',
  minutesToExpires: 1 * 24 * 60, // 1 DIA,
  tokenLength: 64,
} as const;
