import { createContext } from "react";

const _initialValues = {
  auth: undefined,
  login: () => null,
  logout: () => null,
  setReloadUser: () => null,
};

const AuthContext = createContext(_initialValues);

export default AuthContext;
