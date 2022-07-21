import { GET_TODOS, ADD_TODO, DELETE_TODO, TOGGLE_TODO} from './types';
import axios from 'axios';

export const getTodos = () => dispatch => {
  axios
    .get('/api/todos')
    .then(res =>
      dispatch({
        type: GET_TODOS,
        payload: res.data
      })
    )
};

export const addTodo = (todo) => dispatch => {
  console.log(todo)
  axios
    .post('/api/todos', todo)
    .then(res => 
      dispatch({
        type: ADD_TODO,
        payload: res.data
      })
    )

}

export const deleteTodo = (id) => dispatch => {
  axios.delete(`/api/todos/${id}`).then(res =>
    dispatch({
      type: DELETE_TODO,
      payload: id
    })
  )
};

export const toggleTodo = (id,data) => dispatch => {
  axios.patch(`/api/todos/${id}`,data).then(res =>
    dispatch({
      type: TOGGLE_TODO,
      payload: res.data
    })  
  )
}