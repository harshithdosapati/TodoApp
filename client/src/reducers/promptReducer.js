import {REQUEST_SENT, CREATE_ACCOUNT} from '../actions/types';

const initialState = {
  msg: {}
}

export default function(state= initialState,action) {
  switch(action.type) {
    case REQUEST_SENT:
      return{
        msg: {msg: "Request Sent"}
      };
    case CREATE_ACCOUNT:
      return {
        msg: {msg: "Account Created"}
      }
    default:
      return state;
  }
}