import React, { Component } from 'react';
import {Button, Paper, TextField} from '@mui/material';
import TodoList from './components/TodoList';
import './App.css';
import { ClassNames } from '@emotion/react';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Paper elevation={5} className="container">
          <div className='heading'> todos</div>
          <form
          // onSubmit = {}
          className='add'
          style={{margin:"15px 0"}}
          >
            <TextField
            variant='outlined'
            size='small'
            style={{width: "80%"}}
            // value = {}
            required = {true}
            // onChange = {}
            placeholder="Add new Todo"
            />
            <Button
            style={{height:"40px"}} 
            color="primary"
            variant='outlined'
            >
              Add
            </Button>
          </form>
          <TodoList />
        </Paper>
      </div>
    );
  }
}

export default App;
