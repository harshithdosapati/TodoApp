import { combineReducers } from "redux";
import todoReducer from './todoReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import accountReducer from './accountReducer';
import promptReducer from "./promptReducer";
import userReducer from "./userReducer";


export default combineReducers ({
  todo: todoReducer,
  error: errorReducer,
  auth: authReducer,
  account: accountReducer,
  prompt : promptReducer,
  account_users: userReducer
});

