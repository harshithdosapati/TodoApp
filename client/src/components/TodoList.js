import { Button, Checkbox, Paper } from '@mui/material';
import React, { Component } from 'react';

class TodoList extends Component {
  state = {
    todos: [
      {_id: 1, title: 'code1', completed: true},
      {_id: 2, title: 'code2', completed: true},
      {_id: 3, title: 'code3', completed: false},
      {_id: 3, title: 'code4', completed: false},
    ]
  }

  render() {
    const { todos } = this. state;
    return(
      <div>
        {todos.map((todo) => (
        <Paper key={todo._id} className="todo_container" variant='outlined'>
          <div className='textbox'>
            <Checkbox
              checked={todo.completed}
              // onClick={}
              color="primary"
            />
            <div
            className={todo.completed ? 'todo_comp' : 'todo_incomp'}
            >
              {todo.title}
            </div>
          </div>
          <Button
          // onClick = 
          color='secondary'
          >
            X
          </Button>
        </Paper>
        ))}
      </div>
    )
  }
}

export default TodoList;