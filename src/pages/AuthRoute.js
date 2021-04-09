import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import userStore from 'stores/userStore';

export default function AuthRoute({ component: Component, ...rest }) {
  const current = userStore((state) => state.current);
  const storage = JSON.parse(localStorage.getItem('user-storage'));
  return (
    <Route
      {...rest}
      render={(props) =>
        current || storage?.state?.current ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
