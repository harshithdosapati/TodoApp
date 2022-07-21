import React, { Component } from 'react';
import {Button, Paper } from '@mui/material';
import { Provider } from 'react-redux';
import store from './store';
import TodoList from './components/TodoList';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='app'>
          <Paper elevation={5} className="container">
            <div className='heading'> todos</div>
            <TodoList />
          </Paper>
        </div>
      </Provider>
    );
  }
}

export default App;
