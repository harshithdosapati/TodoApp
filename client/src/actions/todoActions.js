import { GET_TODOS, ADD_TODO, DELETE_TODO, TOGGLE_TODO, GET_COMPLETED,} from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getTodos = () => ( dispatch, getState ) => {
  axios
    .get('/api/todos', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_TODOS,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status))
    )
};

export const addTodo = (todo) => ( dispatch, getState ) => {
  axios
    .post('/api/todos', todo, tokenConfig(getState))
    .then(res => 
      dispatch({
        type: ADD_TODO,
        payload: res.data
      })
    )
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status))
    )

};

export const deleteTodo = (id) => ( dispatch, getState ) => {
  axios.delete(`/api/todos/${id}`, tokenConfig(getState)).then(res =>
    dispatch({
      type: DELETE_TODO,
      payload: id
    })
  )
  .catch(err => 
    dispatch(returnErrors(err.response.data, err.response.status))
  )
};

export const toggleTodo = (id,data) => ( dispatch, getState ) => {
  axios.patch(`/api/todos/${id}`,data, tokenConfig(getState)).then(res =>
    dispatch({
      type: TOGGLE_TODO,
      payload: res.data
    })  
  )
  .catch(err => 
    dispatch(returnErrors(err.response.data, err.response.status))
  )
};


export const getCompleted = () => {
  return {
    type: GET_COMPLETED
  };
};
