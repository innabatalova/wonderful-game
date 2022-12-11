import { createBrowserRouter, NonIndexRouteObject } from 'react-router-dom';

import { getUserData } from '../api/auth';
import Error404 from '../pages/Errors/Error-404';
import Game from '../pages/Game';
import Login from '../pages/Login';
import Root from '../pages/Root';
import Signup from '../pages/Signup';
import { IUserInfo } from '../types/pageContext';

export enum ROUTE_PATHS {
  root = '/',
  login = '/login',
  signup = '/signup',
  game = '/game',
  error404 = '/error404',
}

/**
 * Login page
 */
const LOGIN: NonIndexRouteObject = {
  path: ROUTE_PATHS.login,
  element: <Login />,
};

/**
 * Signup page
 */
const SIGNUP: NonIndexRouteObject = {
  path: ROUTE_PATHS.signup,
  element: <Signup />,
};

/**
 * Game page
 */
const GAME: NonIndexRouteObject = {
  path: ROUTE_PATHS.game,
  element: <Game />,
};

/**
 * Error page
 */
 const ERROR404: NonIndexRouteObject = {
  path: ROUTE_PATHS.error404,
  element: <Error404 />,
};

/**
 * Root page
 */
export type TRootLoader = () => Promise<{
  userInfo: IUserInfo | null
  userRoutes: typeof AUTHORIZED_ROUTES
}>

export const rootLoader: TRootLoader = async () => {
  try {
    const { data } = await getUserData();

    return { userInfo: data, userRoutes: AUTHORIZED_ROUTES };
  } catch (err) {
    console.error(err);

    return { userInfo: null, userRoutes: UNAUTHORIZED_ROUTES };
  }
};

const ROOT: NonIndexRouteObject = {
  path: ROUTE_PATHS.root,
  element: <Root />,
  children: [LOGIN, SIGNUP, GAME, ERROR404],
  id: 'root',
  loader: rootLoader,
};

/**
 * Route maps
 */
export const AUTHORIZED_ROUTES = {
  basePath: ROUTE_PATHS.game,
  list: [ROUTE_PATHS.game],
};

export const UNAUTHORIZED_ROUTES = {
  basePath: ROUTE_PATHS.login,
  list: [ROUTE_PATHS.login, ROUTE_PATHS.signup, ROUTE_PATHS.game, ROUTE_PATHS.error404],
};

export const ROUTER = createBrowserRouter([ROOT]);
