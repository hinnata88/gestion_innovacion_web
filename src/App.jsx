import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Login, Register, Confirm } from './screens';
import { BaseLayout } from 'components';
import AuthProvider from './auth/AuthProvider';
import './App.scss';

const Application = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/confirm" component={Confirm} />
        <Route path="/" component={BaseLayout} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </Router>
  );
};

const App = () => {
  return (
    <Suspense fallback="Loading globalization...">
      <AuthProvider>
        <Application />
      </AuthProvider>
    </Suspense>
  );
};

export default App;
