import { Button, Checkbox, Paper, TextField, IconButton, ToggleButtonGroup, ToggleButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTodos, addTodo, deleteTodo, toggleTodo, getCompleted } from '../actions/todoActions';
import PropTypes from 'prop-types';

class TodoList extends Component {
  state = {
    name: ''
  }

  componentDidMount() {
    this.props.getTodos();
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
  }

  onCheckboxClick = (id,completed) => {
    const data = {
      completed: !completed
    }
    this.props.toggleTodo(id,data)
  }

  onCompletedClick = () => {
    this.props.getCompleted()
  }

  render() {
    const { todos } = this.props.todo;
    const activeTodos = todos.filter(todo => todo.completed !== true);
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
            type='text'
            required={true}
            onChange = {this.onChange}
            placeholder="What needs to be done?"
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
          <div className='count'> {activeTodos.length} items left </div>
          <ToggleButtonGroup
            color="primary"
            //size='small'
            sx={{
              height: 30,
            }}
            //value={alignment}
            exclusive
            
          >
            <ToggleButton sx={{textTransform: 'none'}}>All</ToggleButton>
            <ToggleButton sx={{textTransform: 'none'}} onClick={this.onCompletedClick.bind(this)}>Completed</ToggleButton>
            <ToggleButton sx={{textTransform: 'none'}}>Incomplete</ToggleButton>
          </ToggleButtonGroup>
        </Paper>
      </div>
    )
  }
}

/*TodoList.propTypes = {
  getTodos: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired
}*/

const mapStateToProps = (state) => ({
  todo: state.todo
});

export default connect(
  mapStateToProps,
   { getTodos, addTodo, deleteTodo, toggleTodo, getCompleted }
)(TodoList);