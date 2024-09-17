export const diaristPasswordChangeValidationConfig = {
  type: 'diarist-password-change-validation',
  minutesToExpires: 10, // 10 MINUTOS,
  codeSize: 5,
} as const;

export const diaristFirstPasswordSetValidationConfig = {
  type: 'diarist-first-password-set-validation',
  minutesToExpires: 10 * 24 * 60, // 10 DIAS,
} as const;

export const diaristForgotPasswordValidationConfig = {
  type: 'diarist-forgot-password-validation',
  minutesToExpires: 1 * 24 * 60, // 1 DIA,
  tokenLength: 64,
} as const;
