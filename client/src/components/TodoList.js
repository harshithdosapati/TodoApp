import { Button, Checkbox, Paper, TextField } from '@mui/material';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTodos, addTodo, deleteTodo, toggleTodo } from '../actions/todoActions';
import PropTypes from 'prop-types';

class TodoList extends Component {

  componentDidMount() {
    this.props.getTodos();
  }

  onDeleteClick = (id) => {
    this.props.deleteTodo(id);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();

    const newTodo = {
      title: "code3"
    }

    this.props.addTodo(newTodo);
  }

  onCheckboxClick = (id,completed) => {
    completed = !completed
    const data = {
      completed: completed
    }
    this.props.toggleTodo(id,data)
  }

  render() {
    const { todos } = this.props.todo;
    const activeTodos = todos.filter(todo => todo.completed != true);
    return(
      <div>
        <form
          onSubmit = {this.onSubmit}
          className='add'
          style={{ margin: "15px 0" }}
        >
          <TextField
            variant='outlined'
            size='small'
            style={{ width: "80%" }}
            type='String'
            required={true}
            onChange = {this.onChange}
            placeholder="Add new Todo"
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
          <Button
            onClick={this.onDeleteClick.bind(this, todo._id)}
          color='secondary'
          >
            X
          </Button>
        </Paper>
        ))}
        <Paper className='footer'>
          <div className='count'> {activeTodos.length} items left </div>
        </Paper>
      </div>
    )
  }
}

TodoList.propTypes = {
  getTodos: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  todo: state.todo
});

export default connect(
  mapStateToProps,
   { getTodos, addTodo, deleteTodo, toggleTodo }
)(TodoList);