import userService from "../../services/usersService";
import {extractError} from "../../utils/extractError";

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const loginUser = () => ({
  type: LOGIN_USER,
});

export const loginUserSuccess = (payload) => ({
  type: LOGIN_USER_SUCCESS,
  payload,
});

export const loginUserFailure = (payload) => ({
  type: LOGIN_USER_FAILURE,
  payload,
});

export const fetchLoginUser = (user) => (dispatch) => {
  dispatch(loginUser());
  userService.postLoginUser(user)
    .then(({token}) => {
      localStorage.setItem('authToken', token);
      dispatch(loginUserSuccess());
    })
    .catch((errData) => {
      dispatch(loginUserFailure(extractError(errData)));
    })
};

export const REGISTER_USER = 'REGISTER_USER';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const registerUser = () => ({
  type: REGISTER_USER,
});

export const registerUserSuccess = () => ({
  type: REGISTER_USER_SUCCESS,
});

export const registerUserFailure = (payload) => ({
  type: REGISTER_USER_FAILURE,
  payload,
});

export const fetchRegisterUser = (user) => (dispatch) => {
  dispatch(registerUser());
  userService.postRegisterUser(user)
    .then(_ => {
      dispatch(registerUserSuccess());
    })
    .catch((errData) => {
      dispatch(registerUserFailure(extractError(errData)));
    })
};