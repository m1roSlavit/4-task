import userService from "../../services/usersService";
import {extractError} from "../../utils/extractError";

export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const usersRequested = () => ({
  type: FETCH_USERS,
});

export const usersRequestedSuccess = (payload) => ({
  type: FETCH_USERS_SUCCESS,
  payload,
});

export const usersRequestedFailure = (payload) => ({
  type: FETCH_USERS_FAILURE,
  payload,
});

export const fetchUsers = () => (dispatch) => {
  dispatch(usersRequested());
  userService.getAllUsers()
    .then(users => {
      dispatch(usersRequestedSuccess(users));
    })
    .catch(errData => {
      dispatch(usersRequestedFailure(extractError(errData)));
    })
};

export const DO_USERS_ACTION = 'DO_USERS_ACTION';
export const DO_USERS_ACTION_SUCCESS = 'DO_USERS_ACTION_SUCCESS';
export const DO_USERS_ACTION_FAILURE = 'DO_USERS_ACTION_FAILURE';

export const doUsersAction = () => ({
  type: DO_USERS_ACTION,
});

export const doUsersActionSuccess = (payload) => ({
  type: DO_USERS_ACTION_SUCCESS,
});

export const doUsersActionFailure = (payload) => ({
  type: DO_USERS_ACTION_FAILURE,
  payload,
});

export const fetchUsersAction = (ids, action) => (dispatch) => {
  dispatch(doUsersAction());
  userService.postDoUsersAction(ids, action)
    .then(_ => {
      dispatch(fetchUsers());
      dispatch(doUsersActionSuccess());
    })
    .catch(errData => {
      dispatch(doUsersActionFailure(extractError(errData)));
    })
};