import React from 'react';

import './app.scss';
import {LoginPage, RegisterPage, AdminPanelPage} from "../pages";
import {Route} from 'react-router-dom';

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/register">
          <RegisterPage />
        </Route>
        <Route exact path="/admin-panel">
          <AdminPanelPage />
        </Route>
      </div>
    </div>
  );
};

export default App;