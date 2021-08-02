import userReducers from "./user";
import {combineReducers} from "redux";
import usersReducers from "./users";


const rootReducer = combineReducers({
  user: userReducers,
  users: usersReducers
});

export default rootReducer;