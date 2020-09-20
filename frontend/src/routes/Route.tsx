import React, { useCallback } from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { signOut, user, token } = useAuth();

  const isAuthenticated = useCallback((): boolean => {
    if (user) {
      const jwt = JSON.parse(atob(token.split('.')[1]));

      if (new Date().getTime() / 1000 > jwt.exp) {
        signOut();
        return false;
      }
      return true;
    }
    return false;
  }, [signOut, token, user]);

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === isAuthenticated() ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
