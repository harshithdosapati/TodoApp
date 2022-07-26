import { SET_DEFAULT_ACCOUNT, SET_CURRENT_ACCOUNT, REQUEST_SENT, ACCEPT_REQUEST, GET_USERS, CREATE_ACCOUNT} from './types';
import axios from 'axios';
import {tokenConfig} from './authActions';
import { returnErrors } from './errorActions';


export const setDefaultAccount = (id, name) => {
  return {
    type:   SET_DEFAULT_ACCOUNT,
    payload: {id, name}
  }
}

export const setAccount = (id, name) => {
  return {
    type:   SET_CURRENT_ACCOUNT,
    payload: {id, name}
  }
}

export const sendRequest = (body) => (dispatch, getState) => {
  body = JSON.stringify(body);
  axios
    .patch('/api/auth/account', body, tokenConfig(getState))
    .then(res => 
      dispatch({
        type: REQUEST_SENT,
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'REQUEST_FAIL'));
    })
};

export const acceptRequest = (body) => (dispatch, getState) => {
  body = JSON.stringify(body);
  axios
    .patch('/api/users', body, tokenConfig(getState))
    .then(res => 
      dispatch({
        type: ACCEPT_REQUEST,
        payload: res.data
      })
    )
};

export const getUsers = () => (dispatch, getState) => {

  axios.get('/api/auth/account', tokenConfig(getState))
    .then(res => dispatch({
      type: GET_USERS,
      payload: res.data
    }))
}

export const createAccount = (body) => (dispatch, getState) => {
  body = JSON.stringify(body);
  axios
    .post('/api/auth/account', body, tokenConfig(getState))
    .then(res => 
      dispatch({
        type: CREATE_ACCOUNT,
      })
    )
};


