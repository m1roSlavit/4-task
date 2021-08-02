import axios from "axios";

class UsersService {
  _apiBase = 'https://glacial-temple-86292.herokuapp.com';

  _getAuthToken = () => {
    return localStorage.getItem('authToken');
  }

  _authHeaders = {
    Authorization: `token ${this._getAuthToken()}` ?? '',
  }

  postRegisterUser = (user) => {
    return axios.post(`${this._apiBase}/auth/registration`, user)
      .then(res => res.data)
  }

  postLoginUser = (user) => {
    return axios.post(`${this._apiBase}/auth/login`, user)
      .then(res => res.data)
  }

  getAllUsers = () => {
    return axios.get(`${this._apiBase}/users`, {
      headers: {
        ...this._authHeaders
      }
    })
      .then(res => res.data)
  }

  postDoUsersAction = (ids, action) => {
    return axios.post(`${this._apiBase}/doUsersAction`, {
      ids,
      action,
    }, {
      headers: {
        ...this._authHeaders
      }
    })
      .then(res => res.data)
  }
}

const userService = new UsersService();

export default userService;