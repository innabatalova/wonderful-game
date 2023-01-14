import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  IUserSigninReq,
  requestLogOut,
  requestLogIn,
  IUserSignUpReq,
  requestSignUp,
} from '../api/auth';
import { RoutePaths } from '../utils/routes';

export interface IUseAuthReturn {
  login: (data: IUserSigninReq) => void;
  logout: VoidFunction;
  signup: (data: IUserSignUpReq) => void;
}

export const useAuth = (): IUseAuthReturn => {
  const navigate = useNavigate();

  const login = useCallback(async (data: IUserSigninReq) => {
    try {
      await requestLogIn(data);
      navigate(RoutePaths.login);
    } catch (err) {
      return err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await requestLogOut();
      navigate(RoutePaths.game);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const signup = useCallback(async (data: IUserSignUpReq) => {
    try {
      await requestSignUp(data);
      navigate(0);
    } catch (err) {
      console.error(err);
    }
  }, []);

  return {
    login,
    logout,
    signup,
  };
};
