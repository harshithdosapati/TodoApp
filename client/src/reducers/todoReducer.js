import {
   GET_TODOS, 
   ADD_TODO, 
   DELETE_TODO, 
   TOGGLE_TODO, 
   CLEAR_TODOS,
   GET_LENGTH,
   GET_COMPLETED_TODOS, 
   GET_ACTIVE_TODOS 
  } from '../actions/types';

const initialState = {
  todos: [],
  length: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_TODOS:
      return{
        ...state,
        todos: action.payload
      }
    case ADD_TODO:
      return{
        ...state,
        todos: [action.payload, ...state.todos]
      }
    case DELETE_TODO:
      return{
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.payload)
      }
    case TOGGLE_TODO:
      return{
        ...state,
        todos: [action.payload, ...state.todos.filter(todo =>todo._id !== action.payload._id)]
      }
    case CLEAR_TODOS:
      return{
        ...state,
        todos: []
      }
    case GET_LENGTH:
      return{
        ...state,
        length: action.payload.filter(todo => todo.completed === false).length
      }
    case GET_COMPLETED_TODOS:
      return{
        ...state,
        todos: action.payload.filter(todo => todo.completed === true)
      }
    case GET_ACTIVE_TODOS:
      return{
        ...state,
        todos: action.payload.filter(todo => todo.completed === false)
        }
    default:
      return state;
  }
}