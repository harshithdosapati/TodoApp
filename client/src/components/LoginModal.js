import React, { Component } from 'react';
import Modal from '@mui/material/Modal';
import { TextField, InputLabel, Button, Box, Alert } from '@mui/material';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50.5%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

class LoginModal extends Component {
  state = {
    isOpen: false,
    email: '',
    password: '',
    msg: null
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const {error, isAuthenticated} = this.props;
    if(error !== prevProps.error) {
      if(error.id === 'LOGIN_FAIL') {
        this.setState({msg: error.msg.msg});
      } else {
        this.setState({msg: null});
      }
    }

    if(this.state.isOpen) {
      if(isAuthenticated) {
        this.handleClose();
      }
    }
  }

  handleOpen = () => {
    this.setState({isOpen: true})
  }

  handleClose = () => {
    this.props.clearErrors();
    this.setState({isOpen: false})
  }

  onNameChange = e => {
    this.setState({ name: e.target.value});
  }

  onEmailChange = e => {
    this.setState({ email: e.target.value});
  }

  onPasswordChange = e => {
    this.setState({ password: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password
    }

    this.props.login(user);
    
  }

  render() {
    return (
      <div>
        <Button color='inherit' onClick={this.handleOpen}>Login</Button>
        <Modal
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {this.state.msg ? <Alert severity='error'> {this.state.msg} </Alert> :null}
            <form onSubmit={this.onSubmit} className='register_form'>
                <InputLabel className='input'>Email</InputLabel>
                <TextField
                  type='text'
                  name='email'
                  id='email'
                  placeholder='Email'
                  size='small'
                  onChange={this.onEmailChange}
                />
                <InputLabel className='input'>Password</InputLabel>
                <TextField
                  type='text'
                  name='password'
                  id='password'
                  placeholder='Password'
                  size='small'
                  onChange={this.onPasswordChange}
                />
                <Button type='submit' variant='contained' color='primary'>Login</Button>
            </form>
          </Box>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { login, clearErrors }
)(LoginModal);