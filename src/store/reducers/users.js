import {
  DO_USERS_ACTION, DO_USERS_ACTION_FAILURE,
  DO_USERS_ACTION_SUCCESS,
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS
} from "../actions/users";

const initialState = {
  usersList: {
    loading: false,
    users: [],
    error: null,
  },
  usersAction: {
    loading: false,
    done: false,
    error: null,
  }
}

const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        usersList: {
          loading: true,
          users: [],
          error: null,
        }
      }
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        usersList: {
          loading: false,
          users: action.payload,
          error: null,
        }
      }
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        usersList: {
          loading: false,
          users: [],
          error: action.payload,
        }
      }
    case DO_USERS_ACTION:
      return {
        ...state,
        usersAction: {
          loading: true,
          done: false,
          error: null,
        }
      }
    case DO_USERS_ACTION_SUCCESS:
      return {
        ...state,
        usersAction: {
          loading: false,
          done: true,
          error: null,
        }
      }
    case DO_USERS_ACTION_FAILURE:
      return {
        ...state,
        usersAction: {
          loading: false,
          done: false,
          error: action.payload,
        }
      }
    default:
      return state
  }
}

export default usersReducers;