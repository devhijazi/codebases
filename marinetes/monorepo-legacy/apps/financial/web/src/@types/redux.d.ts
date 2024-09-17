import 'react-redux';

interface RootStore {
  auth: AuthState;
}

declare module 'react-redux' {
  interface DefaultRootState extends RootStore {}
}
