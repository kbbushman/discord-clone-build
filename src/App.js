import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Account from './pages/Account';
import AuthRoute from './pages/AuthRoute';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Invite from './pages/Invite';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import ViewGuild from './pages/ViewGuild';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password/:token" component={ResetPassword} />
      <AuthRoute exact path="/channels/me" component={Home} />
      <AuthRoute exact path="/channels/me/:channelId" component={Home} />
      <AuthRoute
        exact
        path="/channels/:guildId/:channelId"
        component={ViewGuild}
      />
      <AuthRoute exact path="/account" component={Account} />
      <AuthRoute exact path="/:link" component={Invite} />
    </Switch>
  );
}
