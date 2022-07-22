import { GET_TODOS, ADD_TODO, DELETE_TODO, TOGGLE_TODO, GET_COMPLETED} from '../actions/types';

const initialState = {
  todos: []
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
    case GET_COMPLETED:
      return{
        ...state,
        todos: state.todos.filter(todo => todo.completed == true)
      }
    default:
      return state;
  }
}