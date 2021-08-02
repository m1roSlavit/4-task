import {
  LOGIN_USER, LOGIN_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  REGISTER_USER,
  REGISTER_USER_FAILURE,
  REGISTER_USER_SUCCESS
} from "../actions/user";

const initialState = {
  login: {
    loading: false,
    done: false,
    error: null,
  },
  registration: {
    loading: false,
    done: false,
    error: null,
  }
}

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        registration: {
          loading: true,
          error: null,
          done: false,
        }
      }
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        registration: {
          loading: false,
          done: true,
          error: null,
        }
      }
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        registration: {
          loading: false,
          done: false,
          error: action.payload,
        }
      }
    case LOGIN_USER:
      return {
        ...state,
        login: {
          loading: true,
          error: null,
          done: false,
        }
      }
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        login: {
          loading: false,
          done: true,
          error: null,
        }
      }
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        login: {
          loading: false,
          done: false,
          error: action.payload,
        }
      }
    default:
      return state
  }
}

export default userReducers;