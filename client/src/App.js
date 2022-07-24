import React, { Component } from 'react';
import { Paper } from '@mui/material';
import { Provider } from 'react-redux';
import store from './store';
import TodoList from './components/TodoList';
import NavBar from './components/NavBar';
import './App.css';
import {loadUser} from './actions/authActions';


class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <NavBar/>
        <div className='app'>
          <Paper elevation={5} className="container">
            <div className='heading'>todos</div>
            <TodoList />
          </Paper>
        </div>
      </Provider>
    );
  }
}

export default App;
