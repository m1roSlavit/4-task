import React from 'react';
import {Link} from "react-router-dom";
import * as yup from "yup";
import {Formik} from "formik";
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";

const RegisterFormValidationSchema = yup.object().shape({
  name: yup.string()
    .required('Field is required'),
  email: yup.string()
    .email('Must be a valid email')
    .required('Field is required'),
  password: yup.string()
    .required('Field is required'),
});

const RegisterForm = () => {
  const {fetchRegisterUser} = useActions();
  const {registration} = useSelector(state => state.user);

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      onSubmit={(values, { setSubmitting }) => {
        fetchRegisterUser(values);
        setSubmitting(false);
      }}
      validationSchema={RegisterFormValidationSchema}
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
        }) => (
        <form onSubmit={handleSubmit} className="login-form border rounded shadow-sm p-3">
          <div className="mb-3"><h4 className="text-center">Sign up</h4></div>
          <div className="mb-3">
            <label htmlFor="registerFormName" className="form-label">Name:</label>
            <input type="text"
                   name="name"
                   onChange={handleChange}
                   onBlur={handleBlur}
                   value={values.name}
                   className="form-control"
                   id="registerFormName"
            />
            <div className="invalid-feedback d-block">
              {touched.name && errors.name}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="registerFormEmail" className="form-label">Email:</label>
            <input type="email"
                   name="email"
                   onChange={handleChange}
                   onBlur={handleBlur}
                   value={values.email}
                   className="form-control"
                   id="registerFormEmail"
            />
            <div className="invalid-feedback d-block">
              {touched.email && errors.email}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="registerFormPassword" className="form-label">Password:</label>
            <input type="password"
                   name="password"
                   onChange={handleChange}
                   onBlur={handleBlur}
                   value={values.password}
                   className="form-control"
                   id="registerFormPassword"
            />
            <div className="invalid-feedback d-block">
              {touched.password && errors.password}
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-end">
            <button type="submit" disabled={registration.loading || (!isValid || !dirty)} className="btn btn-primary m-a">Sign up</button>
            <Link to="/login">Sign in</Link>
          </div>
          <div className="d-flex">
            {
              registration.error ? (
                <div className="invalid-feedback d-block">
                  {registration.error}
                </div>
              ) : null
            }
            {
              registration.done ? (
                <div className="valid-feedback d-block">
                  You have successfully registered
                </div>
              ) : null
            }
          </div>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;