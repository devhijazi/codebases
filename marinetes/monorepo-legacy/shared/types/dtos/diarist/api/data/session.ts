export type SessionLoginData = {
  stay: boolean;
  email: string;
  password: string;
};

export type SessionRefreshData = {
  refreshToken: string;
};
