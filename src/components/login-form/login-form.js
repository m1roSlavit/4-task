import React from 'react';
import {Formik} from "formik";
import * as yup from 'yup';

import './login-form.scss';
import {Link} from "react-router-dom";
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";

const LoginFormValidationSchema = yup.object().shape({
  email: yup.string()
    .email('Must be a valid email')
    .required('Field is required'),
  password: yup.string()
    .required('Field is required'),
});

const LoginForm = () => {
  const {fetchLoginUser} = useActions();
  const {login} = useSelector(state => state.user);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values, { setSubmitting }) => {
        fetchLoginUser(values);
        setSubmitting(false);
      }}
      validationSchema={LoginFormValidationSchema}
    >
      {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
          dirty
          /* and other goodies */
        }) => (
        <form onSubmit={handleSubmit} className="login-form border rounded shadow-sm p-3">
          <div className="mb-3"><h4 className="text-center">Sign in</h4></div>
          <div className="mb-3">
            <label htmlFor="loginFormEmail" className="form-label">Email:</label>
            <input type="email"
                   name="email"
                   className="form-control"
                   onChange={handleChange}
                   onBlur={handleBlur}
                   value={values.email}
                   id="loginFormEmail"
            />
            <div className="invalid-feedback d-block">
              {touched.email && errors.email}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="loginFormPassword" className="form-label">Password:</label>
            <input type="password"
                   name="password"
                   className="form-control"
                   onChange={handleChange}
                   onBlur={handleBlur}
                   value={values.password}
                   id="loginFormPassword"
            />
            <div className="invalid-feedback d-block">
              {touched.password && errors.password}
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end">
            <button type="submit" disabled={isSubmitting || (!isValid || !dirty)} className="btn btn-primary m-a">Sign in</button>
            <Link to="/register">Sign up</Link>
          </div>
          <div className="d-flex">
            {
              login.error ? (
                <div className="invalid-feedback d-block">
                  {login.error}
                </div>
              ) : null
            }
            {
              login.done ? (
                <div className="valid-feedback d-block">
                  You have successfully logged in
                </div>
              ) : null
            }
          </div>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;