export interface ReduxAuthState {
  token: string;
  signed: boolean;
}

export interface ReduxRootStore {
  auth: ReduxAuthState;
}
