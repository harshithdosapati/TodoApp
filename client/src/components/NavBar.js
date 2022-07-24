import React, { Component, Fragment } from 'react';
import {Button, Paper } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import RegisterModal from './RegisterModal';
import Logout from './Logout';
import LoginModal from './LoginModal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NavBar extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  render() {
    const { isAuthenticated, user} = this.props.auth;

    const userAccess = (
      <Fragment>
        <span className='welcome-text'>
          <Typography
            sx={{paddingRight: 4}}
          >
          <strong>{ user? `Welcome ${user.name}!` : ''} </strong>
          </Typography>
        </span>
        <Logout/>
      </Fragment>
    )

    const guestAccess = (
      <Fragment>
        <RegisterModal/>
        <LoginModal/>
      </Fragment>
    )

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Todos
            </Typography>
            { isAuthenticated ? userAccess : guestAccess }
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, null)(NavBar);