import React from 'react';
import RegisterForm from "../register-form";
import Header from "../header";

const RegisterPage = () => {
  return (
    <div>
      <Header />
      <div className="d-flex justify-content-center align-items-center h-100 mt-5">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;