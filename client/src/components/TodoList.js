import { Button, Checkbox, Paper, TextField, IconButton, ToggleButtonGroup, ToggleButton, Alert } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { Component, Text } from 'react';
import { connect } from 'react-redux';
import { getTodos, addTodo, deleteTodo, toggleTodo, clearTodos, getCompletedTodos, getActiveTodos, getLength} from '../actions/todoActions';

class TodoList extends Component {
  state = {
    name: '',
    toggle: "all"
  }

  componentDidMount() {
    this.props.getTodos();
  }


  componentDidUpdate(prevProps) {
    if(prevProps.isAuthenticated !== this.props.isAuthenticated) {
      if(this.props.isAuthenticated === true) this.props.getTodos();
      else this.props.clearTodos();
    }
    if(prevProps !== this.props) return this.props.getLength();
  }
  
  onDeleteClick = (id) => {
    this.props.deleteTodo(id);
  }

  onChange = e => {
    this.setState({ name: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();

    const newTodo = {
      title: this.state.name
    }

    this.props.addTodo(newTodo);
    this.setState({ name : '' })
  }

  onCheckboxClick = (id,completed) => {
    const data = {
      completed: !completed
    }
    this.props.toggleTodo(id,data)
  }

  onAllClick = () => {
    this.props.getTodos()
  }

  onCompletedClick = () => {
    this.props.getCompletedTodos()
  }

  onIncompleteClick = () => {
    this.props.getActiveTodos()
  }

  handleToggleChange = (e, newtoggle) => {
    if(newtoggle !== null){
      this.setState({
        toggle: newtoggle
      })
    }
  }

  render() {
    const { todos, length } = this.props.todo;
    const isAuthenticated = this.props.isAuthenticated;
    return(
      <div>
        {!isAuthenticated ? <Alert severity='warning'>Please login to manage your todos</Alert> :null}
        <form
          onSubmit = {this.onSubmit}
          className='add'
          style={{ margin: "15px 0" }}
        >
          <TextField
            variant='outlined'
            size='small'
            style={{ width: "80%" }}
            type='text'
            value={this.state.name}
            onChange = {this.onChange}
            placeholder="Add your task here"
          />
          <Button
            style={{ height: "40px" }}
            color="primary"
            variant='outlined'
            type='submit'
          >
            Add
          </Button>
        </form>
        {todos.map((todo) => (
        <Paper key={todo._id} className="todo_container" variant='outlined'>
          <div className='textbox'>
            <Checkbox
              checked={todo.completed}
               onClick={this.onCheckboxClick.bind(this, todo._id, todo.completed)}
              color="primary"
            />
            <div
            className={todo.completed ? 'todo_comp' : 'todo_incomp'}
            >
              {todo.title}
            </div>
          </div>
          <IconButton
            onClick={this.onDeleteClick.bind(this, todo._id)}
          color='primary'
          >
            <DeleteIcon/>
          </IconButton>
        </Paper>
        ))}
        <Paper className='footer' elevation={0}>
          <div className='count'> {isAuthenticated? `${length} items left` : ''} </div>
          <ToggleButtonGroup
            color="primary"
            sx={{
              height: 30,
            }}
            value={this.state.toggle}
            exclusive
            onChange={this.handleToggleChange}
          >
            <ToggleButton value="all" sx={{textTransform: 'none'}}onClick={this.onAllClick.bind(this)}>All</ToggleButton>
            <ToggleButton value="completed" sx={{textTransform: 'none'}} onClick={this.onCompletedClick.bind(this)}>Completed</ToggleButton>
            <ToggleButton value="incomplete" sx={{textTransform: 'none'}}onClick={this.onIncompleteClick.bind(this)}>Incomplete</ToggleButton>
          </ToggleButtonGroup>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  todo: state.todo,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
   { getTodos, addTodo, deleteTodo, toggleTodo, clearTodos, getCompletedTodos, getActiveTodos, getLength }
)(TodoList);