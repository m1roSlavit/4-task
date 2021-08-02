import React from 'react';
import LoginForm from "../login-form";
import Header from "../header";

const LoginPage = () => {
  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center align-items-center h-100 mt-5">
        <LoginForm/>
      </div>
    </div>
  );
};

export default LoginPage;